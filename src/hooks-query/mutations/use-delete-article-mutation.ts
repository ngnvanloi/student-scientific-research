import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { APIErrorResponse, IResponseFromAPI } from "@/types/Meta";
import { HTTPError } from "ky";

export const useDeleteArticleMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  return useMutation<IResponseFromAPI, APIErrorResponse, number, unknown>({
    mutationFn: (postID) => deleteArticle(postID),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if delete article successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error delete article: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
    },
  });
};

export async function deleteArticle(postID: number): Promise<IResponseFromAPI> {
  try {
    const response = await communityRequest<IResponseFromAPI>(
      `api/Article?id=${postID}`,
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
