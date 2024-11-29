import { IDataResponseFromAPI, IListDataResponseFromAPI } from "@/types/Meta";
import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { RegistrationForm } from "@/types/RegistrationForm";

export type ParamsGetListRegistrationForm = {
  competitionId: number;
  index: number;
  pageSize: number;
  idSearch?: string;
  internalCodeSearch?: string;
  isAccepted: number;
};
// Hook để sử dụng useQuery cho việc lấy thông tin
export const useGetListRegistrationForm = (
  params: ParamsGetListRegistrationForm
) => {
  return useQuery<
    IDataResponseFromAPI<IListDataResponseFromAPI<RegistrationForm>>,
    Error
  >({
    queryKey: queryKeys.listRegistrationForm(params),

    queryFn: () => GetListRegistrationForm(params), //queryFn yêu cầu một hàm, không phải kết quả của hàm đó.
  });
};

export async function GetListRegistrationForm(
  param: ParamsGetListRegistrationForm
): Promise<IDataResponseFromAPI<IListDataResponseFromAPI<RegistrationForm>>> {
  const baseUrl = `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/RegistrationForm/competition`;
  //
  // Sử dụng URLSearchParams để xây dựng query string
  const queryParams = new URLSearchParams({
    competitionId: param.competitionId.toString(),
    index: param.index.toString(),
    pageSize: param.pageSize.toString(),
    isAccepted: param.isAccepted.toString(),
  });

  // Thêm các tham số khác nếu có
  if (param.idSearch) {
    queryParams.append("idSearch", param.idSearch);
  }
  if (param.internalCodeSearch) {
    queryParams.append("internalCodeSearch", param.internalCodeSearch);
  }

  const fullUrl = `${baseUrl}?${queryParams.toString()}`;
  const response = (await communityRequest)(fullUrl, {
    method: "GET",
  });
  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<RegistrationForm>
  >;
}
