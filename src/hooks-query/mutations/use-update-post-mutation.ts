import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { APIErrorResponse, IDataResponseFromAPI } from "@/types/Meta";
import { UploadFile } from "antd";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";
import { HTTPError } from "ky";

export type ParamsUpdatePost = {
  Title: string;
  Content: string;
  DateUpload?: string | Date | undefined;
  FilePath?: string;
};

export const useUpdatePostMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  return useMutation<
    IDataResponseFromAPI<null>,
    APIErrorResponse,
    { data: ParamsUpdatePost; id: number },
    unknown
  >({
    mutationFn: ({ id, data }) => updatePost(id, data),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if update post successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error update post: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
    },
  });
};

export async function updatePost(
  id: number,
  data: ParamsUpdatePost
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
      `api/Post?id=${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token vào header
        },
        data, // ParamsUpdatePost bao gồm file và nội dung bài viết
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
