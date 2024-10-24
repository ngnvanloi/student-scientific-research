import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IDataResponseFromAPI } from "@/types/Meta";

export const useDeletePostMutation = () => {
  return useMutation<IDataResponseFromAPI<null>, Error, number, unknown>({
    mutationFn: (postID) => deletePost(postID),
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
    console.error("Error delete post:", error);
    throw error;
  }
}
