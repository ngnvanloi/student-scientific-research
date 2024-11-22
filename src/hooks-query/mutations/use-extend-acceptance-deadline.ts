import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type {
  APIErrorResponse,
  IDataResponseFromAPI,
  IResponseFromAPI,
} from "@/types/Meta";
import { getSession } from "next-auth/react";
import { CoAuthor } from "@/types/CoAuthor";
import { HTTPError } from "ky";

export type ParamsExtendAcceptanceDeadline = {
  month: number;
};

export const useExtendAcceptanceDeadlineMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  return useMutation<
    IResponseFromAPI,
    APIErrorResponse,
    { id: number; params: ParamsExtendAcceptanceDeadline },
    unknown
  >({
    mutationFn: ({ params, id }) => updateResearchTopic(id, params),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if extend acceptance deadline successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error extend acceptance deadline: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
    },
  });
};

export async function updateResearchTopic(
  id: number,
  data: ParamsExtendAcceptanceDeadline
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
      `api/Organizer/review-committee/date-end/${id}`,
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
