import { communityRequest } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";

export type ParamsRegisterAccount = {
  name: string;
  email: string;
  password: string;
  numberPhone: string;
  roleName?: string;
};

export const useRegisterAccountMutation = () => {
  return useMutation<IResponseFromAPI, Error, ParamsRegisterAccount, unknown>({
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
    console.error("Error creating account:", error);
    throw error;
  }
}
