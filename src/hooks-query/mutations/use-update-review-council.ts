import { communityRequest } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { APIErrorResponse, IResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";
import { ReviewBoardMembers } from "@/types/ReviewBoardMembers";
import { HTTPError } from "ky";

export type ParamsUpdateReviewCouncil = {
  reviewCommitteeName: string;
  dateStart: string;
  dateEnd: string;
  reviewBoardMembers: ReviewBoardMembers[];
};

export const useUpdateReviewCouncilMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  return useMutation<
    IResponseFromAPI,
    APIErrorResponse,
    { id: number; params: ParamsUpdateReviewCouncil },
    unknown
  >({
    mutationFn: ({ params, id }) => updateReviewCouncil(id, params),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if update review council successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error update review council: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
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
