import { IDataResponseFromAPI } from "@/types/Meta";
import { communityRequest, setAuthToken } from "@/web-configs/community-api";
import { useMutation, useQuery } from "@tanstack/react-query";

// Hook để sử dụng useQuery cho việc lấy thông tin user profile
export const useGetProfile = () => {
  return useQuery<IDataResponseFromAPI<TUser>, Error>({
    queryKey: ["userProfile"], // Key dùng để quản lý cache và dữ liệu
    queryFn: getProfile, // Hàm gọi API
  });
};

export async function getProfile(): Promise<IDataResponseFromAPI<TUser>> {
  const response = (await communityRequest)(
    `${process.env.NEXT_PUBLIC_COMMUNITY_BASE_URL}api/User/infor`,
    {
      method: "GET",
    }
  );
  return response as unknown as IDataResponseFromAPI<TUser>;
}
