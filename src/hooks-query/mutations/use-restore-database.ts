import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { APIErrorResponse, IDataResponseFromAPI } from "@/types/Meta";
import { HTTPError } from "ky";

export const useRestoreDatabaseMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  return useMutation<
    IDataResponseFromAPI<string>,
    APIErrorResponse,
    FormData,
    unknown
  >({
    mutationFn: (data) => restoreDatabase(data),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if restore database successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error restore database: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
    },
  });
};

export async function restoreDatabase(
  data: FormData
): Promise<IDataResponseFromAPI<string>> {
  //   const session = await getSession();
  //   if (!session) {
  //     throw new Error("User not authenticated");
  //   }
  //   console.log("Checking getSession() from Server side: ", session.user);
  try {
    const response = await communityRequest<IDataResponseFromAPI<string>>(
      `api/database/restore-backup`,
      {
        method: "POST",
        // headers: {},
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
