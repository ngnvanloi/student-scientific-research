import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { APIErrorResponse, IDataResponseFromAPI } from "@/types/Meta";
import { UploadFile } from "antd";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";
import { HTTPError } from "ky";

export const useUploadFileMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  return useMutation<
    IDataResponseFromAPI<string>,
    APIErrorResponse,
    FormData,
    unknown
  >({
    mutationFn: (data) => uploadFile(data),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if upload file successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error upload file: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
    },
  });
};

export async function uploadFile(
  data: FormData
): Promise<IDataResponseFromAPI<string>> {
  //   const session = await getSession();
  //   if (!session) {
  //     throw new Error("User not authenticated");
  //   }
  //   console.log("Checking getSession() from Server side: ", session.user);
  try {
    const response = await communityRequest<IDataResponseFromAPI<string>>(
      `api/Firebase/upload-file`,
      {
        method: "POST",
        // headers: {},
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
