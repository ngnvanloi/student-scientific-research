export type TFormLoginData = {
  email: string;
  password: string;
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
