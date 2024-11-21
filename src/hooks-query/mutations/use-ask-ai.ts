import { communityRequest } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { APIErrorResponse, IDataResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";
import { HTTPError } from "ky";
import { GenAI } from "@/types/GenAI";

export type ParamsAskAI = {
  maxLength: number;
  language: "vi" | "en";
};

export const useAskAIMutation = (onErrorCallback?: (msg: string) => void) => {
  return useMutation<
    IDataResponseFromAPI<GenAI>,
    APIErrorResponse,
    { params: ParamsAskAI; data: string },
    unknown
  >({
    mutationFn: ({ params, data }) => askAI(params, data),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if send email successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error send email: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
    },
  });
};

export async function askAI(
  params: ParamsAskAI,
  data: string
): Promise<IDataResponseFromAPI<GenAI>> {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  console.log("Checking getSession() from Server side: ", session.user);
  try {
    const response = await communityRequest<IDataResponseFromAPI<GenAI>>(
      `api/GoogleAI/summarize?maxLength=${params.maxLength}&language=${params.language}`,
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
