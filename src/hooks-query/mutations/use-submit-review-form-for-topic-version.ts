import { communityRequest } from "@/web-configs/community-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";
import { queryKeys } from "../queries/query-keys";

export type ParamsSubmitReviewForm = {
  content: string;
  history_Update_ResearchTopicId: number;
  concludeId: number;
};

export const useSubmitReviewFormMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<IResponseFromAPI, Error, ParamsSubmitReviewForm, unknown>({
    mutationFn: (data) => createNewCompetition(data),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log("Check result if successfully: ", JSON.stringify(result));
      queryClient.invalidateQueries({
        queryKey: [queryKeys.researchTopicDetail],
      });
    },
    onError: (err) => {
      console.log("Error creating post: ", err);
    },
  });
};

export async function createNewCompetition(
  data: ParamsSubmitReviewForm
): Promise<IResponseFromAPI> {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  console.log("Checking getSession() from Server side: ", session.user);
  try {
    const response = await communityRequest<IResponseFromAPI>(
      `api/ReviewForm/review-form`,
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
    console.error("Error creating post:", error);
    throw error;
  }
}
