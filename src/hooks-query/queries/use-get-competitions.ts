import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";

export type ParamsGetListCompetition = {
  index: number;
  pageSize: number;
  nameSearch?: string;
  organizerName?: string;
};
// Hook để sử dụng useQuery cho việc lấy danh sách cuộc thi
export const useGetListCompetition = (params: ParamsGetListCompetition) => {
  return useQuery<
    IDataResponseFromAPI<IListDataResponseFromAPI<Competition[]>>,
    Error
  >({
    queryKey: queryKeys.listCompetition,
    queryFn: () => GetListCompetition(params),
  });
};

export async function GetListCompetition(
  param: ParamsGetListCompetition
): Promise<IDataResponseFromAPI<IListDataResponseFromAPI<Competition[]>>> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/competitions/all?index=${param.index}&pageSize=${param.pageSize}`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<Competition[]>
  >;
}

// GET FOR ADMIN
// Hook để sử dụng useQuery cho việc lấy danh sách cuộc thi
export const useGetListCompetitionAdmin = (
  params: ParamsGetListCompetition
) => {
  return useQuery<
    IDataResponseFromAPI<IListDataResponseFromAPI<Competition[]>>,
    Error
  >({
    queryKey: queryKeys.listCompetitionAdmin,
    queryFn: () => GetListCompetitionaAdmin(params),
  });
};

export async function GetListCompetitionaAdmin(
  param: ParamsGetListCompetition
): Promise<IDataResponseFromAPI<IListDataResponseFromAPI<Competition[]>>> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/competitions/organizer?index=${param.index}&pageSize=${param.pageSize}`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<Competition[]>
  >;
}
