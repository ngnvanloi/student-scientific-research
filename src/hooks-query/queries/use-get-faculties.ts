import {
  IDataResponseFromAPI,
  IDataRetrievedResponseFromAPI,
  IListDataResponseFromAPI,
} from "@/types/Meta";
import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { Faculty } from "@/types/Faculty";

export const useGetListFaculty = () => {
  return useQuery<IDataRetrievedResponseFromAPI<Faculty>, Error>({
    queryKey: queryKeys.listFaculty,
    queryFn: () => GetListFaculty(), //queryFn yêu cầu một hàm, không phải kết quả của hàm đó.
  });
};

export async function GetListFaculty(): Promise<
  IDataRetrievedResponseFromAPI<Faculty>
> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Faculty`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataRetrievedResponseFromAPI<Faculty>;
}
