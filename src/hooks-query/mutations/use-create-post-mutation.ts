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

export async function createNewPost(
  data: FormData
): Promise<IDataResponseFromAPI<null>> {
  try {
    const response = await communityRequest<IDataResponseFromAPI<null>>(
      `api/Post`,
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

// export async function createNewPost(
//   formData: FormData
// ): Promise<IDataResponseFromAPI<null>> {
//   const token =
//     "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJyb2xlIjoib3JnYW5pemVyIiwiZXhwIjoxNzI5NTcxNDEyLCJpc3MiOiJzZW1pbmFyLW1hbmFnZW1lbnQtYmUiLCJhdWQiOiJzZW1pbmFyLW1hbmFnZW1lbnQtZmUifQ.3TcqSrQDOLrywdshuukRjh2UFZsOHG4xYC8xlUFOzEk"; // Lấy token từ localStorage hoặc context tùy vào cách bạn lưu trữ

//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Post`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Error: ${response.statusText}`);
//   }

//   return response.json() as Promise<IDataResponseFromAPI<null>>;
// }
