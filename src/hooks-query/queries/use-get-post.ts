import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";

export const useGetPostDetail = (id: number) => {
  return useQuery<IDataResponseFromAPI<Post>, Error>({
    queryKey: queryKeys.postDetail(id),
    queryFn: () => GetPostDetail(id),
  });
};

export async function GetPostDetail(
  id: number
): Promise<IDataResponseFromAPI<Post>> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Post/${id}`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataResponseFromAPI<Post>;
}
