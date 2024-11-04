import { communityRequest } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IDataResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";

export type ParamsUpdateAuthorProfile = {
  name: string;
  email: string;
  numberPhone: string;
  internalCode: string;
  dateOfBirth: string;
  sex: string;
  facultyId: number;
};

export const useUpdateAuthorProfileMutation = () => {
  return useMutation<
    IDataResponseFromAPI<null>,
    Error,
    { data: ParamsUpdateAuthorProfile },
    unknown
  >({
    mutationFn: ({ data }) => updateAuthorProfile(data),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log("Check result if successfully: ", JSON.stringify(result));
    },
    onError: (err) => {
      console.log("Error update: ", err);
    },
  });
};

export async function updateAuthorProfile(
  data: ParamsUpdateAuthorProfile
): Promise<IDataResponseFromAPI<null>> {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }

  const token = session.user?.accessToken || "";

  console.log("Checking getSession() from Server side: ", session.user);

  try {
    const response = await communityRequest<IDataResponseFromAPI<null>>(
      `api/User/update-author`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      }
    );
    console.log("Response:", response);
    return response;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}
