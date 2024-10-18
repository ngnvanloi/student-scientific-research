import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { ApiResponseWithObject, UseAppQuery } from "@/types/Meta";

export const getPosts = async (params: any): Promise<Post[]> => {
  // ApiResponseWithObject<Post[]>: sử dụng khi responses trả về object bao gồm data: T[]; meta: Meta; message: string; success: boolean.
  // Trong đó data chứa thông tin một mảng các dữ liệu
  const data = await communityRequest<Post[]>("posts", {
    params,
  });
  console.log("Check getPosts is a promise: ", data);
  return data;
};

export const useGetPosts = (props?: UseAppQuery<Post, Error>) => {
  return useQuery<Post[], Error>({
    queryKey: queryKeys.posts,
    queryFn: () => getPosts({}),
  });
};
