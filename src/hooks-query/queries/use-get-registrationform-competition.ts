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
    queryKey: [
      queryKeys.listRegistrationForm,
      params.competitionId,
      params.index,
      params.pageSize,
      params.isAccepted,
    ],
    queryFn: () => GetListRegistrationForm(params), //queryFn yêu cầu một hàm, không phải kết quả của hàm đó.
  });
};

export async function GetListRegistrationForm(
  param: ParamsGetListRegistrationForm
): Promise<IDataResponseFromAPI<IListDataResponseFromAPI<RegistrationForm>>> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/RegistrationForm/competition?competitionId=${param.competitionId}&index=${param.index}&pageSize=${param.pageSize}&isAccepted=${param.isAccepted}`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataResponseFromAPI<
    IListDataResponseFromAPI<RegistrationForm>
  >;
}
