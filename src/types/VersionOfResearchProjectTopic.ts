import { ReviewForm } from "./HistoryUpdateResearchTopic";

export type VersionOfResearchProjectTopic = {
  id: number;
  researchTopicId: number;
  newReportFilePath: string;
  newProductFilePath: string;
  dateUpdate: string;
  summary: string;
  review_Forms: ReviewForm[];
};
