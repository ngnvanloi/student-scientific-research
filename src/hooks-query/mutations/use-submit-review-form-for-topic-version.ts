import { communityRequest } from "@/web-configs/community-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { APIErrorResponse, IResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";
import { queryKeys } from "../queries/query-keys";
import { HTTPError } from "ky";

export type ParamsSubmitReviewForm = {
  content: string;
  history_Update_ResearchTopicId: number;
  concludeId: number;
};

export const useSubmitReviewFormMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation<
    IResponseFromAPI,
    APIErrorResponse,
    ParamsSubmitReviewForm,
    unknown
  >({
    mutationFn: (data) => createNewCompetition(data),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if submit review form successfully: ",
        JSON.stringify(result)
      );
      queryClient.invalidateQueries({
        queryKey: [queryKeys.researchTopicDetail],
      });
    },
    onError: (err) => {
      console.log("Error submit review form: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
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
