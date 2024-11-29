import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type {
  APIErrorResponse,
  IDataWithTokenResponseFromAPI,
} from "@/types/Meta";
import { auth } from "@/auth";
import { HTTPError } from "ky";

export type LoginParams =
  | { password: string; phone_number: string }
  | { email: string; password: string };

export const useLoginMutation = (onErrorCallback?: (msg: string) => void) => {
  return useMutation<
    IDataWithTokenResponseFromAPI<Account>,
    APIErrorResponse,
    LoginParams,
    unknown
  >({
    mutationFn: (data) => login(data),
    onMutate: () => {},
    onSuccess: (result) => {
      //handleOnLoginSuccess(result); // set access token
    },
    onError: (err) => {
      console.log("Error login mutation: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
    },
  });
};

export async function login(
  data: LoginParams
): Promise<IDataWithTokenResponseFromAPI<Account>> {
  try {
    const response = await communityRequest(
      `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Auth/login`,
      {
        method: "POST",
        data,
      }
    );
    return response as IDataWithTokenResponseFromAPI<Account>;
  } catch (error) {
    if (error instanceof HTTPError) {
      // Lấy thông tin lỗi từ response của server
      const errorResponse = await error.response.json();
      throw {
        errorCode: errorResponse.errorCode,
        errorMessage: errorResponse.errorMessage,
      };
    }
    // Xử lý các lỗi khác
    throw {
      errorCode: "UnknownError",
      errorMessage: "An unknown error occurred",
    };
  }
}

export function handleOnLoginSuccess(
  result: IDataWithTokenResponseFromAPI<Account>
) {
  setAuthToken(result.data.tokenResponse?.refreshToken);
}
