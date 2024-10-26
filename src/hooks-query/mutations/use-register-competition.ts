import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IDataResponseFromAPI } from "@/types/Meta";
import { UploadFile } from "antd";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";

export type ParamsRegisterCompetiton = {
  competitionId: number;
  filePath: string;
};

export const useRegisterCompetitonMutation = () => {
  return useMutation<
    IDataResponseFromAPI<null>,
    Error,
    ParamsRegisterCompetiton,
    unknown
  >({
    mutationFn: (data) => createNewPost(data),
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

export async function createNewPost(
  data: ParamsRegisterCompetiton
): Promise<IDataResponseFromAPI<null>> {
  //   const session = await getSession();
  //   if (!session) {
  //     throw new Error("User not authenticated");
  //   }
  //   console.log("Checking getSession() from Server side: ", session.user);
  try {
    const response = await communityRequest<IDataResponseFromAPI<null>>(
      `api/RegistrationForm`,
      {
        method: "POST",
        headers: {},
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
