type ResearchTopic = {
  id: number;
  nameTopic: string;
  dateUpload: Date;
  description: string;
  target: string;
  achievedResult: string;
  isAcceptanceStatus: boolean;
  isReviewStatus: boolean;
  productFilePath: string;
  reportFilePath: string;
  articalID: number;
  disciplineID: number;
  competitionID: number;
  review_CommitteeId?: number;
  reviewCommitteeName?: string;
};
