import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IDataResponseFromAPI } from "@/types/Meta";
import { UploadFile } from "antd";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";

export type ParamsCreateNotification = {
  notificationContent: string;
  notificationDate: string;
  recevierId: number;
  notificationTypeId: number;
  targetId: number;
};

export const useCreateNotificationMutation = () => {
  return useMutation<
    IDataResponseFromAPI<null>,
    Error,
    ParamsCreateNotification,
    unknown
  >({
    mutationFn: (data) => createNewNotification(data),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if create post successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error creating post: ", err);
    },
  });
};

export async function createNewNotification(
  data: ParamsCreateNotification
): Promise<IDataResponseFromAPI<null>> {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  console.log("Checking getSession() from Server side: ", session.user);
  try {
    const response = await communityRequest<IDataResponseFromAPI<null>>(
      `api/Notification`,
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
    console.error("Error creating post:", error);
    throw error;
  }
}
