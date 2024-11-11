import { Contributor } from "./Contributor";

export type ResearchTopicWithContributors = {
  id: number;
  nameTopic: string;
  dateUpLoad: string;
  description: string;
  target: string;
  achievedResults?: string;
  summary?: string;
  budget: number;
  projectDuration: number;
  isAcceptanceApproved: false;
  isReviewerAcceptance: false;
  budgetFilePath: string;
  productFilePath: string;
  reportFilePath: string;
  dateStart: string | Date;
  dateEnd: string | Date;
  articleId: number;
  articleName: string;
  disciplineId: number;
  disciplineName: string;
  competitionId: number;
  review_CommitteeId?: number;
  competitionName: string;
  supervisor: string;
  coAuthors: Contributor[];
};
