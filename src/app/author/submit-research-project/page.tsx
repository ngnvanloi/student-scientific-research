import { CompetitionListForAuthor } from "@/components/CompetitionList/CompetitionList";
import { SubmitResearchProject } from "@/components/SubmitResearchProject/SubmitResearchProject";

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
