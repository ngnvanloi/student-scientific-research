export type TFormLoginData = {
  email: string;
  password: string;
};
export type TFormRegisterData = {
  name: string;
  email: string;
  password: string;
  numberPhone: string;
  roleName?: string;
};
export type TFormResetPassword = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};
export type TFormSubmitResearchProjectTabOveriew = {
  researchProject_ID: number;
  researchProject_Name: string;
  researchProject_Description: string;
  researchProject_DateUpload: string;
  articleID: string;
  disciplineID: string;
  competitionID: number;
};

export type TFormSubmitArticle = {
  title?: string;
  description?: string;
  keywords?: string[];
  filePath?: string;
  dateUpload?: string | Date;
  disciplineId?: string;
};
export type TFormSubmitResearchTopic = {
  nameTopic: string;
  description: string;
  target: string;
  achievedResults: string;
  budget: number;
  projectDuration: number;
  supervisor: string;
  summary?: string;
  productFilePath?: string;
  budgetFilePath?: string;
  reportFilePath?: string;
  articleId?: string;
  disciplineId: string;
  competitionId?: number;
};
export type TFormUpdateArticle = {
  title: string;
  disciplineId: string;
};

export type TFormApprovalRegistration = {
  approvalStatus: number | string;
};
export type TFormSubmitNewTopicVersion = {
  summary: string;
};

export type TFormSubmitResearchProjectTabGoalResult = {
  researchProject_Goal: string;
  researchProject_Result: string;
};

export type TFormAddPost = {
  title: string;
  // content: string;
  // dateUpload: string | Date;
  // filePath?: any;
};

export type TFormAddCompetition = {
  competitionName: string;
  description: string;
  destination: string;
};

export type TFormAddContributor = {
  name: string;
  email: string;
  numberPhone: string;
  dateOfBirth?: string;
  sex?: string;
  roleName?: string;
};
export type TFormReviewAssignment = {
  review_CommitteeId: string;
};
export type TFormAddReviewer = {
  name: string;
  email: string;
  numberPhone: string;
  dateOfBirth?: string;
  sex?: string;
  description?: string;
};

export type TFormUpdateAuthor = {
  name: string;
  email: string;
  numberPhone: string;
  internalCode?: string;
  dateOfBirth?: string;
  sex?: string;
  facultyId?: string;
};
export type TFormUpdateReviewer = {
  name: string;
  email: string;
  numberPhone: string;
  dateOfBirth?: string;
  sex?: string;
  academicRank?: string;
  academicDegree?: string;
  facultyId?: string;
};

export type TFormUpdateOrganizer = {
  name: string;
  email: string;
  numberPhone: string;
  facultyId?: string;
  description: string;
};
export type TFormReviewTopic = {
  content: string;
  concludeId: string;
};

export type TFormEstablishReviewCouncil = {
  name: string;
};
