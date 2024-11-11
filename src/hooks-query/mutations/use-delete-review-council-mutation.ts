import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IDataResponseFromAPI } from "@/types/Meta";

export const useDeleteReviewCouncilMutation = () => {
  return useMutation<IDataResponseFromAPI<null>, Error, number, unknown>({
    mutationFn: (reviewCouncilID) => deleteReviewCouncil(reviewCouncilID),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if delete reviewCouncil successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error delete reviewCouncil: ", err);
    },
  });
};

export async function deleteReviewCouncil(
  id: number
): Promise<IDataResponseFromAPI<null>> {
  try {
    const response = await communityRequest<IDataResponseFromAPI<null>>(
      `api/Organizer/review-committee/${id}`,
      {
        method: "DELETE",
        // headers: {},
      }
    );
    console.log("Response:", response);
    return response;
  } catch (error) {
    console.error("Error delete reviewCouncil:", error);
    throw error;
  }
}
