import { IDataRetrievedResponseFromAPI } from "@/types/Meta";
import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { Notification } from "@/types/Notification";

// Hook để sử dụng useQuery cho việc lấy danh sách cuộc thi
export const useGetListNotification = () => {
  return useQuery<IDataRetrievedResponseFromAPI<Notification>, Error>({
    queryKey: queryKeys.listNotification,
    queryFn: () => GetListNotification(),
  });
};

export async function GetListNotification(): Promise<
  IDataRetrievedResponseFromAPI<Notification>
> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/Notification`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataRetrievedResponseFromAPI<Notification>;
}
