import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { APIErrorResponse, IDataResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";
import ky, { HTTPError } from "ky";

export type ParamsUpdateCompetition = {
  competitionName: string;
  dateStart: string | undefined;
  dateEnd: string | undefined;
  dateEndSubmit: string | undefined;
  description: string;
  destination: string;
};

export const useUpdateCompetitionMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  return useMutation<
    IDataResponseFromAPI<null>,
    APIErrorResponse,
    { id: number; data: ParamsUpdateCompetition },
    unknown
  >({
    mutationFn: ({ id, data }) => updateCompetition(id, data),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if update post successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error updateing post: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
    },
  });
};

export async function updateCompetition(
  id: number,
  data: ParamsUpdateCompetition
): Promise<IDataResponseFromAPI<null>> {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  console.log("Checking getSession() from Server side: ", session.user);
  try {
    const response = await communityRequest<IDataResponseFromAPI<null>>(
      `api/competitions?id=${id}`,
      {
        method: "PATCH",
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
