import { Contributor } from "./Contributor";

export type ResearchProjectTopic = {
  id: number;
  nameTopic: string;
  dateUpLoad: string | Date;
  description: string;
  target: string;
  achievedResults: string;
  budget: number;
  projectDuration: number;
  isAcceptanceApproved: boolean;
  isReviewerAcceptance: boolean;
  budgetFilePath: string;
  productFilePath: string;
  reportFilePath: string;
  dateStart: string;
  dateEnd: string;
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
