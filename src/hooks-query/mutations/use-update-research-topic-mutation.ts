import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IDataResponseFromAPI, IResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";
import { CoAuthor } from "@/types/CoAuthor";

export type ParamsUpdateResearchTopic = {
  nameTopic: string;
  description: string;
  target: string;
  achievedResults: string;
  budget: number;
  projectDuration: number;
  supervisor: string;
  summary: string;
  productFilePath: string;
  budgetFilePath: string;
  reportFilePath: string;
  articleId: number;
  disciplineId: number;
  competitionId: number;
  coAuthors?: CoAuthor[];
};

export const useUpdateResearchTopicMutation = () => {
  return useMutation<
    IResponseFromAPI,
    Error,
    { id: number; params: ParamsUpdateResearchTopic },
    unknown
  >({
    mutationFn: ({ params, id }) => updateResearchTopic(id, params),
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
  id: number,
  data: ParamsUpdateResearchTopic
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
      `api/ResearchTopic/update/${id}`,
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
