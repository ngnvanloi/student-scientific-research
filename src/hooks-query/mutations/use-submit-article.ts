import { communityRequest } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";
import { CoAuthor } from "@/types/CoAuthor";

export type ParamsSubmitArticle = {
  title: string;
  description: string;
  keywords: string[];
  filePath: string;
  dateUpload: string | Date;
  disciplineId: number | undefined | string;
  coAuthors?: CoAuthor[];
};

export const useSubmitArticleMutation = () => {
  return useMutation<IResponseFromAPI, Error, ParamsSubmitArticle, unknown>({
    mutationFn: (data) => createNewCompetition(data),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if create post successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error creating post: ", err);
    },
  });
};

export async function createNewCompetition(
  data: ParamsSubmitArticle
): Promise<IResponseFromAPI> {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  console.log("Checking getSession() from Server side: ", session.user);
  try {
    const response = await communityRequest<IResponseFromAPI>(`api/Article`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
      },
      data,
    });
    console.log("Response:", response);
    return response;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}
