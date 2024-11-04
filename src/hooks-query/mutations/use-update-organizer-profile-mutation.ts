import { communityRequest } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IDataResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";

export type ParamsUpdateOrganizerProfile = {
  name: string;
  email: string;
  numberPhone: string;
  facultyId: number | string | undefined;
  description: string;
};

export const useUpdateOrganizerProfileMutation = () => {
  return useMutation<
    IDataResponseFromAPI<null>,
    Error,
    { data: ParamsUpdateOrganizerProfile },
    unknown
  >({
    mutationFn: ({ data }) => updateOrganizerProfile(data),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log("Check result if successfully: ", JSON.stringify(result));
    },
    onError: (err) => {
      console.log("Error update: ", err);
    },
  });
};

export async function updateOrganizerProfile(
  data: ParamsUpdateOrganizerProfile
): Promise<IDataResponseFromAPI<null>> {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }

  const token = session.user?.accessToken || "";

  console.log("Checking getSession() from Server side: ", session.user);

  try {
    const response = await communityRequest<IDataResponseFromAPI<null>>(
      `api/User/update-organizer`,
      {
        method: "PATCH",
        headers: {
          Organizerization: `Bearer ${token}`,
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
