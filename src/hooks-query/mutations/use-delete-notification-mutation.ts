import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IResponseFromAPI } from "@/types/Meta";

export const useDeleteNotificationMutation = () => {
  return useMutation<IResponseFromAPI, Error, number, unknown>({
    mutationFn: (notificationID) => deleteNotification(notificationID),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if delete notification successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error delete notification: ", err);
    },
  });
};

export async function deleteNotification(
  notificationID: number
): Promise<IResponseFromAPI> {
  try {
    const response = await communityRequest<IResponseFromAPI>(
      `api/Notification/${notificationID}`,
      {
        method: "DELETE",
        // headers: {},
      }
    );
    console.log("Response:", response);
    return response;
  } catch (error) {
    console.error("Error delete notification:", error);
    throw error;
  }
}
