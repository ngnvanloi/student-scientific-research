import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { APIErrorResponse, IDataResponseFromAPI } from "@/types/Meta";
import { HTTPError } from "ky";

export const useDeleteReviewCouncilMutation = (
  onErrorCallback?: (msg: string) => void
) => {
  return useMutation<
    IDataResponseFromAPI<null>,
    APIErrorResponse,
    number,
    unknown
  >({
    mutationFn: (reviewCouncilID) => deleteReviewCouncil(reviewCouncilID),
    onMutate: () => {},
    onSuccess: (result) => {
      console.log(
        "Check result if delete reviewCouncil successfully: ",
        JSON.stringify(result)
      );
    },
    onError: (err) => {
      console.log("Error delete reviewCouncil: ", err);
      if (onErrorCallback) {
        onErrorCallback(err.errorMessage);
      }
    },
  });
};

export async function deleteReviewCouncil(
  id: number
): Promise<IDataResponseFromAPI<null>> {
  try {
    const response = await communityRequest<IDataResponseFromAPI<null>>(
      `api/Organizer/review-committee/${id}`,
      {
        method: "DELETE",
        // headers: {},
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
