"use client";
import { useGetResearchProjectTopicDetail } from "@/hooks-query/queries/use-get-research-topic-detail";
import PreviewPDFBookmark from "../PreviewPDF/PreviewPDFBookmark";
import FormReviewResearchTopic from "./FormReviewResearchTopic";
import ResearchTopicOverview from "./ResearchTopicOverview";

const ReviewResearchTopicContainer = () => {
  const { data: researchTopic } = useGetResearchProjectTopicDetail(1);
  console.log("checking research topic here: ", researchTopic);
  return (
    <div className="flex gap-1 flex-col">
      <div className="border px-5 py-4">
        <ResearchTopicOverview researchTopic={researchTopic?.data} />
      </div>
      <div className="flex gap-1">
        <div className=" basis-1/2 h-screen">
          <PreviewPDFBookmark fileUrl="https://firebasestorage.googleapis.com/v0/b/seminarclouds.appspot.com/o/ReportFile%2F8ad96830-bf95-41bf-aa05-1a5beb66e9eb_mongodb.pdf?alt=media" />
        </div>
        <div className="basis-1/2 border">
          <FormReviewResearchTopic />
        </div>
      </div>
    </div>
  );
};
export default ReviewResearchTopicContainer;
