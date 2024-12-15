import { BackupRestoreDatabase } from "@/components/BackupRestoreDatabase/BackupRestoreDatabase";
export const metadata = {
  title: "Quản Trị Viên - Trang Sao Lưu Và Phục Hồi Dữ Liệu",
  description: "Quản lý toàn bộ hệ thống nghiên cứu khoa học của nhà trường.",
};
const BackupRestoreDatabasePage = () => {
  return (
    <div>
      <BackupRestoreDatabase />
    </div>
  );
};
export default BackupRestoreDatabasePage;
