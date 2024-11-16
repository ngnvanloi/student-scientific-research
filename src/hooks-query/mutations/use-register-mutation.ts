import { communityRequest } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { APIErrorResponse, IResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";
import { HTTPError } from "ky";

export type ParamsRegisterAccount = {
  name: string;
  email: string;
  password: string;
  numberPhone: string;
  roleName?: string;
};

export const useRegisterAccountMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  return useMutation<
    IResponseFromAPI,
    APIErrorResponse,
    ParamsRegisterAccount,
    unknown
  >({
    mutationFn: (data) => createNewAccount(data),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if create account successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error creating account: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
    },
  });
};

export async function createNewAccount(
  data: ParamsRegisterAccount
): Promise<IResponseFromAPI> {
  try {
    const response = await communityRequest<IResponseFromAPI>(
      `api/Auth/register`,
      {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
        },
        data,
      }
    );
    console.log("Response:", response);
    return response;
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
