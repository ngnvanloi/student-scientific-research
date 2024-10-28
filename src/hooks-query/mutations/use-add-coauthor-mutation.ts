import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IResponseFromAPI } from "@/types/Meta";
import { UploadFile } from "antd";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";
import { CoAuthor } from "@/types/CoAuthor";

export type ParamsAddCoAuthor = {
  coAuthors: CoAuthor[];
};

export const useAddCoAuthorMutation = () => {
  return useMutation<
    IResponseFromAPI,
    Error,
    { articleID: number; data: ParamsAddCoAuthor },
    unknown
  >({
    mutationFn: ({ articleID, data }) => createNewCompetition(articleID, data),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if create successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error creating: ", err);
    },
  });
};

export async function createNewCompetition(
  articleID: number,
  data: ParamsAddCoAuthor
): Promise<IResponseFromAPI> {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  console.log("Checking getSession() from Server side: ", session.user);
  try {
    const response = await communityRequest<IResponseFromAPI>(
      `api/authors/create-coauthor?articleId=${articleID}`,
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
