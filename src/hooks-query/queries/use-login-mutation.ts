import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { ApiResponseWithObject, UseAppQuery } from "@/types/Meta";
import { User } from "next-auth";
import { queryKeys } from "./query-keys";

export type LoginResponse = ApiResponseWithObject<{
  access_token: string;
  expired_at: number;
}>;

export type LoginParams =
  | { password: string; phone_number: string }
  | { email: string; password: string };

export const useLoginMutation = () => {
  return useMutation<LoginResponse, Error, LoginParams, unknown>({
    mutationFn: (data) => login(data),
    onMutate: () => {},
    onSuccess: (result) => {
      handleOnLoginSuccess(result);
    },
    onError: (err) => {},
  });
};

export async function login(data: LoginParams): Promise<LoginResponse> {
  const response = await communityRequest<LoginResponse>(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}login`,
    {
      method: "POST",
      data,
    }
  );
  return response as LoginResponse;
}

export function handleOnLoginSuccess(result: LoginResponse) {
  const { access_token } = result.data;
  setAuthToken(access_token);
}
