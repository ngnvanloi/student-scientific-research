import {
  IDataResponseFromAPI,
  IDataRetrievedResponseFromAPI,
  IListDataResponseFromAPI,
} from "@/types/Meta";
import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { Conclude } from "@/types/Conclude";

export const useGetListConclude = () => {
  return useQuery<IDataRetrievedResponseFromAPI<Conclude>, Error>({
    queryKey: queryKeys.listConclude,
    queryFn: () => GetListConclude(), //queryFn yêu cầu một hàm, không phải kết quả của hàm đó.
  });
};

export async function GetListConclude(): Promise<
  IDataRetrievedResponseFromAPI<Conclude>
> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Conclude`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataRetrievedResponseFromAPI<Conclude>;
}
