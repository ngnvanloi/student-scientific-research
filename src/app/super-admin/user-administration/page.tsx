import { UserManagement } from "@/components/UserManagement/UserManagement";
import { UserManagementContainer } from "@/components/UserManagement/UserManagementContainer";
export const metadata = {
  title: "Quản Trị Viên - Trang Quản Lý Người Dùng",
  description: "Quản lý toàn bộ hệ thống nghiên cứu khoa học của nhà trường.",
};
const UserManagementPage = () => {
  return (
    <div>
      <UserManagementContainer />
    </div>
  );
};

export default UserManagementPage;
