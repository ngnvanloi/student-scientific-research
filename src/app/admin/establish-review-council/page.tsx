import { EstablishReviewCouncilPageContainer } from "@/components/EstablishReviewCouncilPageContainer/EstablishReviewCouncilPageContainer";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "Quản Trị Viên";

  return {
    title: `${userName} - Trang Thành Lập Hội Đồng Phản Biện`,
    description: "Ban tổ chức cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const EstablishReviewCouncilPage = () => {
  return (
    <div>
      <EstablishReviewCouncilPageContainer />
    </div>
  );
};
export default EstablishReviewCouncilPage;
