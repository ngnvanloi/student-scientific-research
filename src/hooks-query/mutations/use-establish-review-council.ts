import { communityRequest } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";
import { ReviewBoardMembers } from "@/types/ReviewBoardMembers";

export type ParamsEstablishReviewCouncil = {
  reviewCommitteeName: string;
  competitionId: number;
  reviewBoardMembers: ReviewBoardMembers[];
};

export const useEstablishReviewCouncilMutation = () => {
  return useMutation<
    IResponseFromAPI,
    Error,
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
    console.error("Error establish review council: ", error);
    throw error;
  }
}
