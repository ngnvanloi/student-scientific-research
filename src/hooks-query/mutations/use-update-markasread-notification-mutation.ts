import { communityRequest } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";

export type ParamsMarkAsReadNoti = {
  status: boolean;
};

export const useMarkAsReadOrUnreadMutation = () => {
  return useMutation<
    IResponseFromAPI,
    Error,
    { id: number; requestbody: ParamsMarkAsReadNoti },
    unknown
  >({
    mutationFn: ({ id, requestbody }) =>
      markAsReadOrUnreadNotification(id, requestbody),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log("Check result if successfully: ", JSON.stringify(result));
    },
    onError: (err) => {
      console.log("Error mutation: ", err);
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
    console.error("Error updating registration form:", error);
    throw error;
  }
}
