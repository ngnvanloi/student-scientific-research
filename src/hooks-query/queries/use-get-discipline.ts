import {
  IDataResponseFromAPI,
  IDataRetrievedResponseFromAPI,
  IListDataResponseFromAPI,
} from "@/types/Meta";
import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { Discipline } from "@/types/Discipline";

export const useGetListDiscipline = () => {
  return useQuery<IDataRetrievedResponseFromAPI<Discipline>, Error>({
    queryKey: queryKeys.listDiscipline,
    queryFn: () => GetListDiscipline(), //queryFn yêu cầu một hàm, không phải kết quả của hàm đó.
  });
};

export async function GetListDiscipline(): Promise<
  IDataRetrievedResponseFromAPI<Discipline>
> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Discipline`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataRetrievedResponseFromAPI<Discipline>;
}
