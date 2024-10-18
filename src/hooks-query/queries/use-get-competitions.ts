import { communityRequest } from "@/web-configs/community-api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { ApiResponseWithObject, UseAppQuery } from "@/types/Meta";

export const getCompetitions = async (params: any): Promise<Competition[]> => {
  // ApiResponseWithObject<Post[]>: sử dụng khi responses trả về object bao gồm data: T[]; meta: Meta; message: string; success: boolean.
  // Trong đó data chứa thông tin một mảng các dữ liệu
  const data = await communityRequest<Competition[]>("competitions", {
    params,
  });
  console.log("Check getCompetitions is a promise: ", data);
  return data;
};

export const useGetCompetitions = (props?: UseAppQuery<Competition, Error>) => {
  return useQuery<Competition[], Error>({
    queryKey: queryKeys.competitions,
    queryFn: () => getCompetitions({}),
  });
};
