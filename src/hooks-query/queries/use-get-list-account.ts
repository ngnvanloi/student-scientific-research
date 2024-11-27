import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { AccountManagement } from "@/types/AccountManagement";

export type ParamsGetListAccount = {
  index: number;
  pageSize: number;
  idSearch?: string;
  nameSearch?: string;
};
export const useGetListAccount = (params: ParamsGetListAccount) => {
  return useQuery<
    IDataResponseFromAPI<IListDataResponseFromAPI<AccountManagement>>,
    Error
  >({
    queryKey: queryKeys.listAccountManagement,
    queryFn: () => GetListAccount(params),
  });
};

export async function GetListAccount(
  param: ParamsGetListAccount
): Promise<IDataResponseFromAPI<IListDataResponseFromAPI<AccountManagement>>> {
  const baseUrl = `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Account/all`;
  // Sử dụng URLSearchParams để xây dựng query string
  const queryParams = new URLSearchParams({
    index: param.index.toString(),
    pageSize: param.pageSize.toString(),
  });

  // Thêm các tham số khác nếu có
  if (param.idSearch) {
    queryParams.append("idSearch", param.idSearch);
  }
  if (param.nameSearch) {
    queryParams.append("nameSearch", param.nameSearch);
  }

  const fullUrl = `${baseUrl}?${queryParams.toString()}`;
  const response = (await communityRequest)(fullUrl, {
    method: "GET",
  });
  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<AccountManagement>
  >;
}
