import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IResponseFromAPI } from "@/types/Meta";

export const useDeleteArticleMutation = () => {
  return useMutation<IResponseFromAPI, Error, number, unknown>({
    mutationFn: (postID) => deleteArticle(postID),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if delete post successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error delete post: ", err);
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
    console.error("Error delete post:", error);
    throw error;
  }
}
