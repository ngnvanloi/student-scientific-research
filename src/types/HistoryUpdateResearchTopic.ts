import { MemberOfCouncil } from "./ReviewCouncilWithMembers";

export type HistoryUpdateResearchTopic = {
  id: number;
  researchTopicId: number;
  newReportFilePath: string;
  newProductFilePath: string;
  dateUpdate: string;
  summary: string;
  review_Forms: ReviewForm[];
};
export type ReviewForm = {
  id: number;
  content: string;
  history_Update_ResearchTopicId: number;
  reviewer: MemberOfCouncil;
  conclude: {
    id: number;
    result: string;
  };
  date_Upload: string;
};
