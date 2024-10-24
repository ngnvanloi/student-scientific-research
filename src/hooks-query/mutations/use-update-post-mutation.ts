import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IDataResponseFromAPI } from "@/types/Meta";
import { UploadFile } from "antd";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";

export type ParamsUpdatePost = {
  Title: string;
  Content: string;
  DateUpload?: string | Date | undefined;
  FilePath?: string;
};

export const useUpdatePostMutation = () => {
  return useMutation<
    IDataResponseFromAPI<null>,
    Error,
    { data: FormData; params: ParamsUpdatePost },
    unknown
  >({
    mutationFn: ({ params, data }) => updatePost(params, data),
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

export async function updatePost(
  params: ParamsUpdatePost,
  data: FormData
): Promise<IDataResponseFromAPI<null>> {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }

  // Token lấy từ session hoặc bất kỳ nơi nào bạn lưu trữ nó
  const token = session.user?.accessToken || ""; // Điều chỉnh lấy token từ session

  console.log("Checking getSession() from Server side: ", session.user);

  try {
    const response = await communityRequest<IDataResponseFromAPI<null>>(
      `api/Post?Title=${params.Title}&Content=${params.Content}`, //&DateUpload=${"2024-07-21T00:00:00"}&FilePath=${params.FilePath || ""}
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token vào header
        },
        data, // FormData bao gồm file và nội dung bài viết
      }
    );
    console.log("Response:", response);
    return response;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

// HÀM DƯỚI ĐÂY VẪN HOẠT ĐỘNG TỐT (SỬ DỤNG FETCH THÔNG THƯỜNG, CÓ THỂ SỬ DỤNG AXIOS Ở ĐÂY)
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
