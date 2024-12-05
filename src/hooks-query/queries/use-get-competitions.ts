import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { Competition } from "@/types/Competition";

export type ParamsGetListCompetition = {
  index: number;
  pageSize: number;
  nameSearch?: string;
  organizerName?: string;
  facultyId?: number;
};
// Hook để sử dụng useQuery cho việc lấy danh sách cuộc thi
export const useGetListCompetition = (params: ParamsGetListCompetition) => {
  return useQuery<
    IDataResponseFromAPI<IListDataResponseFromAPI<Competition>>,
    Error
  >({
    queryKey: queryKeys.listCompetition(params),
    queryFn: () => GetListCompetition(params),
  });
};

export async function GetListCompetition(
  param: ParamsGetListCompetition
): Promise<IDataResponseFromAPI<IListDataResponseFromAPI<Competition>>> {
  const baseUrl = `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/competitions/all`;
  // Sử dụng URLSearchParams để xây dựng query string
  const queryParams = new URLSearchParams({
    index: param.index.toString(),
    pageSize: param.pageSize.toString(),
  });

  // Thêm các tham số khác nếu có
  if (param.organizerName) {
    queryParams.append("organizerName", param.organizerName);
  }
  if (param.nameSearch) {
    queryParams.append("nameSearch", param.nameSearch);
  }
  if (param.facultyId) {
    queryParams.append("facultyId", param.facultyId.toString());
  }
  const fullUrl = `${baseUrl}?${queryParams.toString()}`;
  //
  const response = (await communityRequest)(fullUrl, {
    method: "GET",
  });
  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<Competition>
  >;
}

// GET FOR ADMIN
// Hook để sử dụng useQuery cho việc lấy danh sách cuộc thi
export const useGetListCompetitionAdmin = (
  params: ParamsGetListCompetition
) => {
  return useQuery<
    IDataResponseFromAPI<IListDataResponseFromAPI<Competition>>,
    Error
  >({
    queryKey: queryKeys.listCompetition(params),
    queryFn: () => GetListCompetitionaAdmin(params),
  });
};

export async function GetListCompetitionaAdmin(
  param: ParamsGetListCompetition
): Promise<IDataResponseFromAPI<IListDataResponseFromAPI<Competition>>> {
  const baseUrl = `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/competitions/organizer`;
  // Sử dụng URLSearchParams để xây dựng query string
  const queryParams = new URLSearchParams({
    index: param.index.toString(),
    pageSize: param.pageSize.toString(),
  });

  // Thêm các tham số khác nếu có
  if (param.organizerName) {
    queryParams.append("organizerName", param.organizerName);
  }
  if (param.nameSearch) {
    queryParams.append("nameSearch", param.nameSearch);
  }
  // if (param.facultyId) {
  //   queryParams.append("facultyId", param.facultyId.toString());
  // }

  const fullUrl = `${baseUrl}?${queryParams.toString()}`;

  const response = (await communityRequest)(fullUrl, {
    method: "GET",
  });
  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<Competition>
  >;
}
