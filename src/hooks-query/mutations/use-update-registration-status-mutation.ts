import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IDataResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";

export type ParamsUpdateRegistrationForm = {
  isAccepted: number | string;
};

export const useApprovalRegistrationFormMutation = () => {
  return useMutation<
    IDataResponseFromAPI<null>,
    Error,
    { id: number; requestbody: ParamsUpdateRegistrationForm },
    unknown
  >({
    mutationFn: ({ id, requestbody }) =>
      updateRegistrationForm(id, requestbody),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log("Check result if successfully: ", JSON.stringify(result));
    },
    onError: (err) => {
      console.log("Error mutation: ", err);
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
    console.error("Error updating registration form:", error);
    throw error;
  }
}
