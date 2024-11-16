import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { APIErrorResponse, IDataResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";
import { HTTPError } from "ky";

export type ParamsUpdateRegistrationForm = {
  isAccepted: number | string | boolean;
};

export const useApprovalRegistrationFormMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  return useMutation<
    IDataResponseFromAPI<null>,
    APIErrorResponse,
    { id: number; requestbody: ParamsUpdateRegistrationForm },
    unknown
  >({
    mutationFn: ({ id, requestbody }) =>
      updateRegistrationForm(id, requestbody),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if update registration status successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error update registration status mutation: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
    },
  });
};

export async function updateRegistrationForm(
  id: number,
  requestbody: ParamsUpdateRegistrationForm
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
      `api/RegistrationForm/${id}`, //&DateUpload=${"2024-07-21T00:00:00"}&FilePath=${params.FilePath || ""}
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
