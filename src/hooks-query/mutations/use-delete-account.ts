import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { APIErrorResponse, IResponseFromAPI } from "@/types/Meta";
import { HTTPError } from "ky";
import { queryKeys } from "../queries/query-keys";

export const useDeleteAccountMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation<IResponseFromAPI, APIErrorResponse, number, unknown>({
    mutationFn: (postID) => deleteAccount(postID),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if delete account successfully: ",
        JSON.stringify(result)
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.listAccountManagement,
      });
    },
    onError: (err) => {
      console.log("Error delete account: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
    },
  });
};

export async function deleteAccount(postID: number): Promise<IResponseFromAPI> {
  try {
    const response = await communityRequest<IResponseFromAPI>(
      `api/Account?id=${postID}`,
      {
        method: "DELETE",
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
