import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IDataWithTokenResponseFromAPI } from "@/types/Meta";
import { auth } from "@/auth";

export type LoginParams =
  | { password: string; phone_number: string }
  | { email: string; password: string };

export const useLoginMutation = () => {
  return useMutation<
    IDataWithTokenResponseFromAPI<Account>,
    Error,
    LoginParams,
    unknown
  >({
    mutationFn: (data) => login(data),
    onMutate: () => {},
    onSuccess: (result) => {
      handleOnLoginSuccess(result); // set access token
    },
    onError: (err) => {
      console.error("Login failed: ", err);
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
    console.error("Login error: ", error);
    throw error;
  }
}

export function handleOnLoginSuccess(
  result: IDataWithTokenResponseFromAPI<Account>
) {
  setAuthToken(result.data.tokenResponse?.accessToken);
}
