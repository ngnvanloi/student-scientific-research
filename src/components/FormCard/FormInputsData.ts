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
export type TFormSubmitResearchProjectTabOveriew = {
  researchProject_ID: number;
  researchProject_Name: string;
  researchProject_Description: string;
  researchProject_DateUpload: string;
  articleID: string | number;
  disciplineID: string | number;
  competitionID: number;
};

export type TFormSubmitArticle = {
  title?: string;
  description?: string;
  keywords?: string[];
  filePath?: string;
  dateUpload?: string | Date;
  disciplineId?: number | string;
};

export type TFormApprovalRegistration = {
  approvalStatus: number | string;
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

export type TFormUpdateAuthor = {
  name: string;
  email: string;
  numberPhone: string;
  internalCode?: string;
  dateOfBirth?: string;
  sex?: string;
  facultyId?: number | string;
};

export type TFormUpdateOrganizer = {
  name: string;
  email: string;
  numberPhone: string;
  facultyId?: number | string;
  description: string;
};
