import { communityRequest } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { APIErrorResponse, IResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";
import { HTTPError } from "ky";

export type ParamsApprovedAcceptanceForSuperAdmin = {
  AcceptedForPublicationStatus: number;
};
export const useApprovedAcceptanceForSuperAdminMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  return useMutation<
    IResponseFromAPI,
    APIErrorResponse,
    { id: number; params: ParamsApprovedAcceptanceForSuperAdmin },
    unknown
  >({
    mutationFn: ({ id, params }) => approvedAcceptanceForSuperAdmin(id, params),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if approval acceptance successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error approval acceptance council: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
    },
  });
};

export async function approvedAcceptanceForSuperAdmin(
  id: number,
  data: ParamsApprovedAcceptanceForSuperAdmin
): Promise<IResponseFromAPI> {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  console.log("Checking getSession() from Server side: ", session.user);
  try {
    const response = await communityRequest<IResponseFromAPI>(
      `api/Acceptance/update-for-publication/${id}`,
      {
        method: "PATCH",
        headers: {
          // "Content-Type": "application/json",
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
