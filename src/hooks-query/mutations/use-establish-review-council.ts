import { communityRequest } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { APIErrorResponse, IResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";
import { ReviewBoardMembers } from "@/types/ReviewBoardMembers";
import { HTTPError } from "ky";

export type ParamsEstablishReviewCouncil = {
  reviewCommitteeName: string;
  competitionId: number;
  dateStart: string;
  dateEnd: string;
  reviewBoardMembers: ReviewBoardMembers[];
};

export const useEstablishReviewCouncilMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  return useMutation<
    IResponseFromAPI,
    APIErrorResponse,
    ParamsEstablishReviewCouncil,
    unknown
  >({
    mutationFn: (data) => establishReviewCouncil(data),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log("Check result if successfully: ", JSON.stringify(result));
    },
    onError: (err) => {
      console.log("Error establish review council: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
    },
  });
};

export async function establishReviewCouncil(
  data: ParamsEstablishReviewCouncil
): Promise<IResponseFromAPI> {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  console.log("Checking getSession() from Server side: ", session.user);
  try {
    const response = await communityRequest<IResponseFromAPI>(
      `api/Organizer/review-committee`,
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
