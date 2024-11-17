import { communityRequest } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { APIErrorResponse, IResponseFromAPI } from "@/types/Meta";
import { getSession } from "next-auth/react";
import { HTTPError } from "ky";

export const useSendRegistrationMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  return useMutation<IResponseFromAPI, APIErrorResponse, string, unknown>({
    mutationFn: (data) => createNewAccount(data),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if send otp successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error send otp: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
    },
  });
};

export async function createNewAccount(
  email: string
): Promise<IResponseFromAPI> {
  try {
    const response = await communityRequest<IResponseFromAPI>(
      `api/Auth/send-registration-otp?email=${email}`,
      {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
        },
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
