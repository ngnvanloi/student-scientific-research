import { communityRequest } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";
import { ReviewBoardMembers } from "@/types/ReviewBoardMembers";

export type ParamsUpdateReviewCouncil = {
  reviewCommitteeName: string;
  dateStart: string;
  dateEnd: string;
  reviewBoardMembers: ReviewBoardMembers[];
};

export const useUpdateReviewCouncilMutation = () => {
  return useMutation<
    IResponseFromAPI,
    Error,
    { id: number; params: ParamsUpdateReviewCouncil },
    unknown
  >({
    mutationFn: ({ params, id }) => updateReviewCouncil(id, params),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log("Check result if successfully: ", JSON.stringify(result));
    },
    onError: (err) => {
      console.log("Error update review council: ", err);
    },
  });
};

export async function updateReviewCouncil(
  id: number,
  data: ParamsUpdateReviewCouncil
): Promise<IResponseFromAPI> {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  // Token lấy từ session hoặc bất kỳ nơi nào bạn lưu trữ nó
  const token = session.user?.accessToken || ""; // Điều chỉnh lấy token từ session
  console.log("Checking getSession() from Server side: ", session.user);
  try {
    const response = await communityRequest<IResponseFromAPI>(
      `api/Organizer/review-committee/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      }
    );
    console.log("Response:", response);
    return response;
  } catch (error) {
    console.error("Error update review council: ", error);
    throw error;
  }
}
