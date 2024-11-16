import { APIErrorResponse, IDataResponseFromAPI } from "@/types/Meta";
import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { getSession } from "next-auth/react";

export type ParamsUpdateArticleForPublic = {
  AcceptedForPublicationStatus: number | string;
};

export const useApprovalArticleForPublicMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  return useMutation<
    IDataResponseFromAPI<null>,
    APIErrorResponse,
    { id: number; requestbody: ParamsUpdateArticleForPublic },
    unknown
  >({
    mutationFn: ({ id, requestbody }) =>
      updateArticleForPublic(id, requestbody),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if approval article successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error approval article: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
    },
  });
};

export async function updateArticleForPublic(
  id: number,
  requestbody: ParamsUpdateArticleForPublic
): Promise<IDataResponseFromAPI<null>> {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }

  // Token lấy từ session hoặc bất kỳ nơi nào bạn lưu trữ nó
  const token = session.user?.accessToken || ""; // Điều chỉnh lấy token từ session

  console.log("Checking getSession() from Server side: ", session.user);

  try {
    const response = await communityRequest<IDataResponseFromAPI<null>>(
      `api/Article/approve-article?id=${id}`, //&DateUpload=${"2024-07-21T00:00:00"}&FilePath=${params.FilePath || ""}
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token vào header
        },
        data: requestbody, // FormData bao gồm file và nội dung bài viết
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
