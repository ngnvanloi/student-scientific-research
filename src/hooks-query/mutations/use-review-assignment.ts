import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IDataResponseFromAPI, IResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";
import { CoAuthor } from "@/types/CoAuthor";

export type ParamsReviewAssignment = {
  review_CommitteeId: number | string;
};

export const useReviewAssignmentMutation = () => {
  return useMutation<
    IResponseFromAPI,
    Error,
    { researchTopicId: number; params: ParamsReviewAssignment },
    unknown
  >({
    mutationFn: ({ params, researchTopicId }) =>
      updateResearchTopic(researchTopicId, params),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log("Check result if successfully: ", JSON.stringify(result));
    },
    onError: (err) => {
      console.log("Error updating: ", err);
    },
  });
};

export async function updateResearchTopic(
  researchTopicId: number,
  data: ParamsReviewAssignment
): Promise<IResponseFromAPI> {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }

  // Token lấy từ session hoặc bất kỳ nơi nào bạn lưu trữ nó
  const token = session.user?.accessToken || ""; // Điều chỉnh lấy token từ session

  console.log(
    "Checking getSession() from Server sresearchTopicId e: ",
    session.user
  );

  try {
    const response = await communityRequest<IResponseFromAPI>(
      `api/Organizer/review-committee/assign/${researchTopicId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token vào header
        },
        data, // FormData bao gồm file và nội dung bài viết
      }
    );
    console.log("Response:", response);
    return response;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}
