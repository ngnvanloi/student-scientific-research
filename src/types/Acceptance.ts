import { HistoryUpdateResearchTopic } from "./HistoryUpdateResearchTopic";
import { Author_ResearchTopics } from "./ResearchProjectTopic";
import { ReviewCouncilWithMembers } from "./ReviewCouncilWithMembers";

export type Acceptance = {
  id: number;
  name: string;
  dateAcceptance: string;
  facultyAcceptedStatus: number;
  acceptedForPublicationStatus: number;
  researchTopic: {
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
    dateStart: string;
    dateEnd: string;
    articleId: number;
    articleName: string;
    disciplineId: number;
    disciplineName: string;
    competitionId: number;
    review_CommitteeId?: number;
    reviewCommitteeName?: string;
    competitionName: string;
    supervisor: string;
    // coAuthors: Contributor[];
    review_Committees: ReviewCouncilWithMembers;
    history_Update_ResearchTopics: HistoryUpdateResearchTopic[];
    author_ResearchTopics: Author_ResearchTopics[];
    acceptance?: null | any;
  };
  reviewAcceptances: ReviewAcceptance[];
};

export type ReviewAcceptance = {
  id: number;
  description: string;
  isAccepted: boolean;
  organizer: {
    id: number;
    name: string;
    numberPhone: string;
    description: string;
    facultyId: number;
    facultyName: string;
    accountId: number;
    email: string;
  };
  deletedAt: any | null;
};
