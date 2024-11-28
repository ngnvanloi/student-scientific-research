import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { ResearchTopicWithContributors } from "@/types/ResearchTopicWithContributors";
import { Acceptance } from "@/types/Acceptance";

// lấy bài báo đã public ĐÃ bao gồm danh sách đồng tác giả
export type ParamsGetListAcceptanceForAllRole = {
  index: number;
  pageSize: number;

  idSearch?: number;
  nameTopicSearch?: string;
  nameSearch?: string;
  facultyAcceptedStatus?: number;
  acceptedForPublicationStatus?: number;
  competitionId?: number;
  facultyId?: number;
  accountId?: number;
};
export const useGetListAcceptanceForAllRole = (
  params: ParamsGetListAcceptanceForAllRole
) => {
  return useQuery<
    IDataResponseFromAPI<IListDataResponseFromAPI<Acceptance>>,
    Error
  >({
    queryKey: [
      queryKeys.listAcceptanceForAllRole,
      params.index,
      params.pageSize,
    ],
    queryFn: () => GetListAcceptanceForAllRole(params),
  });
};

export async function GetListAcceptanceForAllRole(
  param: ParamsGetListAcceptanceForAllRole
): Promise<IDataResponseFromAPI<IListDataResponseFromAPI<Acceptance>>> {
  const baseUrl = `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Acceptance/all-acceptances`;
  //
  // Sử dụng URLSearchParams để xây dựng query string
  const queryParams = new URLSearchParams({
    index: param.index.toString(),
    pageSize: param.pageSize.toString(),
  });

  // Thêm các tham số khác nếu có
  if (param.nameTopicSearch) {
    queryParams.append("nameTopicSearch", param.nameTopicSearch);
  }
  if (param.nameSearch) {
    queryParams.append("nameSearch", param.nameSearch);
  }
  if (
    param.acceptedForPublicationStatus !== undefined &&
    param.acceptedForPublicationStatus !== null
  ) {
    queryParams.append(
      "acceptedForPublicationStatus",
      param.acceptedForPublicationStatus.toString()
    );
  }
  if (
    param.facultyAcceptedStatus !== null &&
    param.facultyAcceptedStatus !== undefined
  ) {
    queryParams.append(
      "facultyAcceptedStatus",
      param.facultyAcceptedStatus.toString()
    );
  }
  if (param.competitionId !== null && param.competitionId !== undefined) {
    queryParams.append("competitionId", param.competitionId.toString());
  }
  if (param.idSearch !== null && param.idSearch !== undefined) {
    queryParams.append("idSearch", param.idSearch.toString());
  }
  if (param.facultyId !== null && param.facultyId !== undefined) {
    queryParams.append("facultyId", param.facultyId.toString());
  }
  if (param.accountId !== null && param.accountId !== undefined) {
    queryParams.append("accountId", param.accountId.toString());
  }

  const fullUrl = `${baseUrl}?${queryParams.toString()}`;
  const response = (await communityRequest)(fullUrl, {
    method: "GET",
  });
  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<Acceptance>
  >;
}
