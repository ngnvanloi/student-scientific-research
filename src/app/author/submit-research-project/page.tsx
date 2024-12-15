import { CompetitionListForAuthor } from "@/components/CompetitionList/CompetitionList";
import { SubmitResearchProject } from "@/components/SubmitResearchProject/SubmitResearchProject";
import { auth } from "@/auth";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const userName = session?.user?.name || "HUIT";

  return {
    title: `${userName} - Trang Nộp Đề Tài Nghiên Cứu Khoa Học`,
    description:
      "Tác giả tham gia cuộc thi nghiên cứu khoa học của nhà trường.",
  };
}
const SubmitResearchProjectPage = () => {
  // hiển thị ra danh sách cuộc thi đã đăng kí thành công
  // bấm vào nút nộp bài => show modal submit
  return (
    <div>
      <CompetitionListForAuthor />
      {/* <SubmitResearchProject /> */}
    </div>
  );
};
export default SubmitResearchProjectPage;
