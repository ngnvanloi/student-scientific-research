import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { APIErrorResponse, IDataResponseFromAPI } from "@/types/Meta";
import { queryKeys } from "../queries/query-keys";
import { HTTPError } from "ky";

export const useDeletePostMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<
    IDataResponseFromAPI<null>,
    APIErrorResponse,
    number,
    unknown
  >({
    mutationFn: (postID) => deletePost(postID),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if delete post successfully: ",
        JSON.stringify(result)
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
    onError: (err) => {
      console.log("Error delete post: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
    },
  });
};

export async function deletePost(
  postID: number
): Promise<IDataResponseFromAPI<null>> {
  try {
    const response = await communityRequest<IDataResponseFromAPI<null>>(
      `api/Post/${postID}`,
      {
        method: "DELETE",
        // headers: {},
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
