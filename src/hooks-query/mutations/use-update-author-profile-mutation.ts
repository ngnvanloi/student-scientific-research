import { communityRequest } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { APIErrorResponse, IDataResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";
import { HTTPError } from "ky";

export type ParamsUpdateAuthorProfile = {
  name: string;
  email: string;
  numberPhone: string;
  internalCode: string;
  dateOfBirth: string;
  sex: string;
  facultyId: number;
};

export const useUpdateAuthorProfileMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  return useMutation<
    IDataResponseFromAPI<null>,
    APIErrorResponse,
    { data: ParamsUpdateAuthorProfile },
    unknown
  >({
    mutationFn: ({ data }) => updateAuthorProfile(data),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if update author profile successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error update author profile: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
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
