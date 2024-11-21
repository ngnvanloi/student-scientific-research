import { ArticleWithContributors } from "./ArticleWithContributor";

export type Statistic = {
  competitionStatistics: {
    totalCompetition: number;
    competition: CompetitionStatistics[];
    upcomingCompetition: number;
    ongoingCompetition: number;
    finishedCompetition: number;
  };
  registrationFormStatistics: {
    totalRegistrationForm: number;
    approvedRegistrationForm: number;
    pendingRegistrationForm: number;
    rejectedRegistrationForm: number;
    successfulRegistrationRate: number;
  };
  authorStatistics: {
    totalAuthor: number;
    totalCoAuthor: number;
  };
  reviewCommitteeStatistics: {
    totalReviewCommittee: number;
    totalReviewer: number;
    reviewerParticipationRate: number;
  };
  articleStatistics: {
    article: ArticleWithContributors[] | undefined;
    totalArticle: number;
  };
  disciplineStatistics: {
    totalDiscipline: number;
    disciplineDetailStatistics: DisciplineDetailStatistics[];
  };
  researchFieldStatistics: {
    totalResearchTopic: number;
    totalSuccessfulReviewedTopics: number;
    totalPendingReviewTopics: number;
    successfulReviewRate: number;
    totalRejectedReviewTopics: number;
    totalFacultyPendingReviewTopics: number;
    totalFacultyApprovedTopics: number;
    totalFacultyRejectedTopics: number;
    facultyApprovedTopicsRate: number;
    totalPublishedTopics: number;
    totalPendingPublishedTopics: number;
    totalRejectedPublishedTopics: number;
    publishedTopicsRate: number;
  };
};
export type CompetitionStatistics = {
  id: number;
  competitionName: string;
  dateStart: string;
  dateEnd: string;
  dateEndSubmit: string;
  description: string;
  destination: string;
  organizerId: number;
  accountId: number;
  organizerName: string;
};
export type DisciplineDetailStatistics = {
  discipline: {
    id: number;
    disciplineName: string;
  };
  count: number;
  percent: number;
};
