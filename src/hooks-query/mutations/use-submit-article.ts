import { communityRequest } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { APIErrorResponse, IResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";
import { CoAuthor } from "@/types/CoAuthor";
import { HTTPError } from "ky";

export type ParamsSubmitArticle = {
  title: string;
  description: string;
  keywords: string[];
  filePath: string;
  dateUpload: string | Date;
  disciplineId: number | undefined | string;
  coAuthors?: CoAuthor[];
};

export const useSubmitArticleMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  return useMutation<
    IResponseFromAPI,
    APIErrorResponse,
    ParamsSubmitArticle,
    unknown
  >({
    mutationFn: (data) => createNewCompetition(data),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if submit article successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error submit article: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
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
