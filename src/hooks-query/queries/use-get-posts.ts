import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";

export type ParamsGetListPost = {
  index: number;
  pageSize: number;
  idSearch?: string;
  nameSearch?: string;
};
// Hook để sử dụng useQuery cho việc lấy thông tin user profile
export const useGetListPost = (params: ParamsGetListPost) => {
  return useQuery<
    IDataResponseFromAPI<IListDataResponseFromAPI<Post[]>>,
    Error
  >({
    queryKey: queryKeys.listPost,
    queryFn: () => GetListPost(params), //queryFn yêu cầu một hàm, không phải kết quả của hàm đó.
  });
};

export async function GetListPost(
  param: ParamsGetListPost
): Promise<IDataResponseFromAPI<IListDataResponseFromAPI<Post[]>>> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Post/organizer?index=${param.index}&pageSize=${param.pageSize}`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<Post[]>
  >;
}
