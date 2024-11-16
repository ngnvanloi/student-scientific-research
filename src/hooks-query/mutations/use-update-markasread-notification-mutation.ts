import { communityRequest } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { APIErrorResponse, IResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";
import { HTTPError } from "ky";

export type ParamsMarkAsReadNoti = {
  status: boolean;
};

export const useMarkAsReadOrUnreadMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  return useMutation<
    IResponseFromAPI,
    APIErrorResponse,
    { id: number; requestbody: ParamsMarkAsReadNoti },
    unknown
  >({
    mutationFn: ({ id, requestbody }) =>
      markAsReadOrUnreadNotification(id, requestbody),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if mask as read notification successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error mask as read notification: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
    },
  });
};

export async function markAsReadOrUnreadNotification(
  id: number,
  requestbody: ParamsMarkAsReadNoti
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
      `api/Notification/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token vào header
        },
        data: requestbody,
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
