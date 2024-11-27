import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { APIErrorResponse, IDataResponseFromAPI } from "@/types/Meta";
import { UploadFile } from "antd";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";
import { HTTPError } from "ky";
import { queryKeys } from "../queries/query-keys";
export type ParamsDeactiveAccount = {
  IsSuspended: boolean;
};
export const useDeactivateAccountMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation<
    IDataResponseFromAPI<null>,
    APIErrorResponse,
    { id: number; params: ParamsDeactiveAccount },
    unknown
  >({
    mutationFn: ({ id, params }) => DeactivateAccount(id, params),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if de/active successfully: ",
        JSON.stringify(result)
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.listAccountManagement,
      });
    },
    onError: (err) => {
      console.log("Error de/active: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
    },
  });
};

export async function DeactivateAccount(
  id: number,
  data: ParamsDeactiveAccount
): Promise<IDataResponseFromAPI<null>> {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  const token = session.user?.accessToken || "";

  console.log("Checking getSession() from Server side: ", session.user);

  try {
    const response = await communityRequest<IDataResponseFromAPI<null>>(
      `api/Account?id=${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
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
