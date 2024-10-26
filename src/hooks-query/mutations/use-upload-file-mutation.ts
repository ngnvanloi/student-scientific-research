import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IDataResponseFromAPI } from "@/types/Meta";
import { UploadFile } from "antd";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";

export const useUploadFileMutation = () => {
  return useMutation<IDataResponseFromAPI<string>, Error, FormData, unknown>({
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
    console.error("Error creating post:", error);
    throw error;
  }
}
