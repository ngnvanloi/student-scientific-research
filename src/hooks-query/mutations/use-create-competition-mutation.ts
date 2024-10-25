import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation } from "@tanstack/react-query";
import type { IDataResponseFromAPI } from "@/types/Meta";
import { UploadFile } from "antd";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";

export type ParamsCreateCompetition = {
  competitionName: string;
  dateStart: string | undefined;
  dateEnd: string | undefined;
  description: string;
  destination: string;
};

export const useCreateCompetitionMutation = () => {
  return useMutation<
    IDataResponseFromAPI<null>,
    Error,
    ParamsCreateCompetition,
    unknown
  >({
    mutationFn: (data) => createNewCompetition(data),
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

export async function createNewCompetition(
  data: ParamsCreateCompetition
): Promise<IDataResponseFromAPI<null>> {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  console.log("Checking getSession() from Server side: ", session.user);
  try {
    const response = await communityRequest<IDataResponseFromAPI<null>>(
      `api/competitions`,
      {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
        },
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

// HÀM DƯỚI ĐÂY VẪN HOẠT ĐỘNG TỐT (SỬ DỤNG FETCH THÔNG THƯỜNG, CÓ THỂ SỬ DỤNG AXIOS Ở ĐÂY)
// export async function createNewCompetition(
//   formData: FormData
// ): Promise<IDataResponseFromAPI<null>> {
//   const token =
//     "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJyb2xlIjoib3JnYW5pemVyIiwiZXhwIjoxNzI5NTcxNDEyLCJpc3MiOiJzZW1pbmFyLW1hbmFnZW1lbnQtYmUiLCJhdWQiOiJzZW1pbmFyLW1hbmFnZW1lbnQtZmUifQ.3TcqSrQDOLrywdshuukRjh2UFZsOHG4xYC8xlUFOzEk"; // Lấy token từ localStorage hoặc context tùy vào cách bạn lưu trữ
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Competition`,
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
