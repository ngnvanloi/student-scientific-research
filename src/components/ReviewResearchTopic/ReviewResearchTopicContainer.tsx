"use client";
import PreviewPDFBookmark from "../PreviewPDF/PreviewPDFBookmark";
import FormReviewResearchTopic from "./FormReviewResearchTopic";
import ResearchTopicOverview from "./ResearchTopicOverview";

const ReviewResearchTopicContainer = () => {
  return (
    <div className="flex gap-1">
      <div className="flex gap-1 flex-col bg-green-400 basis-2/3">
        <div className="basis-1/2">
          <ResearchTopicOverview />
        </div>
        <div className="basis-1/2">
          <FormReviewResearchTopic />
        </div>
      </div>
      <div className=" basis-1/3 h-screen">
        <PreviewPDFBookmark fileUrl="https://firebasestorage.googleapis.com/v0/b/seminarclouds.appspot.com/o/Article%2F29be6128-49f6-4f41-85fa-b6a5de492270_V_L0_01247.pdf?alt=media" />
      </div>
    </div>
  );
};
export default ReviewResearchTopicContainer;
