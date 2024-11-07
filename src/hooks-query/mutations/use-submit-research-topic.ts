import { communityRequest } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";
import { CoAuthor } from "@/types/CoAuthor";

export type ParamsSubmitResearchTopic = {
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

export const useSubmitResearchTopicMutation = () => {
  return useMutation<
    IResponseFromAPI,
    Error,
    ParamsSubmitResearchTopic,
    unknown
  >({
    mutationFn: (data) => submitResearchTopic(data),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log("Check result if successfully: ", JSON.stringify(result));
    },
    onError: (err) => {
      console.log("Error submit research topic: ", err);
    },
  });
};

export async function submitResearchTopic(
  data: ParamsSubmitResearchTopic
): Promise<IResponseFromAPI> {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  console.log("Checking getSession() from Server side: ", session.user);
  try {
    const response = await communityRequest<IResponseFromAPI>(
      `api/ResearchTopic`,
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
