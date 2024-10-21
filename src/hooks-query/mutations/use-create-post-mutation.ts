import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IDataResponseFromAPI } from "@/types/Meta";
import { UploadFile } from "antd";
import { auth } from "@/auth";

export type ParamsCreatePost = {
  title: string;
  content: string;
  date: string | Date | undefined;
  file?: UploadFile;
};

export const useCreatePostMutation = () => {
  return useMutation<IDataResponseFromAPI<null>, Error, FormData, unknown>({
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

// export async function createNewPost(
//   data: ParamsCreatePost
// ): Promise<IDataResponseFromAPI<null>> {
//   try {
//     const response = await communityRequest<IDataResponseFromAPI<null>>(
//       `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Post`,
//       {
//         method: "POST",
//         // headers: {
//         //   Authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwIiwicm9sZSI6ImF1dGhvciIsImV4cCI6MTcyOTUyNzczOCwiaXNzIjoic2VtaW5hci1tYW5hZ2VtZW50LWJlIiwiYXVkIjoic2VtaW5hci1tYW5hZ2VtZW50LWZlIn0.xRo6-C8VgSSGk9wxWPGmBaOwjS8Ep2pORzHIkfOfhVo`, // Lấy token từ nơi lưu trữ
//         // },
//         data,
//       }
//     );
//     console.log("Response:", response);
//     return response;
//   } catch (error) {
//     console.error("Error creating post:", error);
//     throw error;
//   }
// }

export async function createNewPost(
  formData: FormData
): Promise<IDataResponseFromAPI<null>> {
  const token =
    "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJyb2xlIjoib3JnYW5pemVyIiwiZXhwIjoxNzMwNzM4OTM3LCJpc3MiOiJzZW1pbmFyLW1hbmFnZW1lbnQtYmUiLCJhdWQiOiJzZW1pbmFyLW1hbmFnZW1lbnQtZmUifQ.gP177IANhFgVtAOoqWn2Zqwt2cboI1Vt_udB4UWFajU"; // Lấy token từ localStorage hoặc context tùy vào cách bạn lưu trữ

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Post`,
    {
      method: "POST",
      headers: {
        // "Content-Type": " multipart/form-data",
        Authorization: `Bearer ${token}`,
        // "Access-Control-Allow-Origin": "*",
        // "Cache-Control": "no-cache",
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json() as Promise<IDataResponseFromAPI<null>>;
}
