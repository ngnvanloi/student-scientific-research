import { string, z, ZodType } from "zod";
import {
  TFormAddCompetition,
  TFormAddContributor,
  TFormAddPost,
  TFormAddReviewer,
  TFormApprovalRegistration,
  TFormEstablishReviewCouncil,
  TFormLoginData,
  TFormRegisterData,
  TFormReviewAssignment,
  TFormReviewTopic,
  TFormSubmitArticle,
  TFormSubmitNewTopicVersion,
  TFormSubmitResearchProjectTabGoalResult,
  TFormSubmitResearchProjectTabOveriew,
  TFormSubmitResearchTopic,
  TFormUpdateArticle,
  TFormUpdateAuthor,
  TFormUpdateOrganizer,
} from "./FormInputsData";
import { title } from "process";

export const FormLoginSchema: ZodType<TFormLoginData> = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});

export const FormRegisterSchema: ZodType<TFormRegisterData> = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
  numberPhone: z.string(),
  roleName: z.string().optional(),
});
export const FormTabOverviewSchema: ZodType<TFormSubmitResearchProjectTabOveriew> =
  z.object({
    researchProject_ID: z.number(),
    researchProject_Name: z.string(),
    researchProject_Description: z.string(),
    researchProject_DateUpload: z.string().date(),
    articleID: z.string(),
    disciplineID: z.string(),
    competitionID: z.number(),
  });

export const FormSubmitArticle: ZodType<TFormSubmitArticle> = z.object({
  title: z.string(),
  // description: z.string(),
  // dateUpload: z.string().date(),
  // keywords: z.array(string()),
  // filePath: z.string(),
  disciplineId: z.string(),
});
export const FormSubmitResearchTopicc: ZodType<TFormSubmitResearchTopic> =
  z.object({
    nameTopic: z.string(),
    description: z.string(),
    target: z.string(),
    achievedResults: z.string(),
    budget: z.number(),
    projectDuration: z.number(),
    supervisor: z.string(),
    summary: z.string().optional(),
    productFilePath: z.string().optional(),
    budgetFilePath: z.string().optional(),
    reportFilePath: z.string().optional(),
    articleId: z.string(),
    disciplineId: z.string(),
    competitionId: z.number().optional(),
  });
export const FormUpdateResearchTopicc: ZodType<TFormSubmitResearchTopic> =
  z.object({
    nameTopic: z.string(),
    description: z.string(),
    target: z.string(),
    achievedResults: z.string(),
    budget: z.number(),
    projectDuration: z.number(),
    supervisor: z.string(),
    summary: z.string().optional(),
    productFilePath: z.string().optional(),
    budgetFilePath: z.string().optional(),
    reportFilePath: z.string().optional(),
    articleId: z.string().optional(),
    disciplineId: z.string(),
    competitionId: z.number(),
  });
export const FormUpdateArticlee: ZodType<TFormUpdateArticle> = z.object({
  title: z.string(),
  disciplineId: z.string(),
});
export const FormSubmitNewTopicVersion: ZodType<TFormSubmitNewTopicVersion> =
  z.object({
    summary: z.string(),
  });
export const FormApprovalRegistration: ZodType<TFormApprovalRegistration> =
  z.object({
    approvalStatus: z.string() || z.number(),
  });
export const FormTabGoalResultSchema: ZodType<TFormSubmitResearchProjectTabGoalResult> =
  z.object({
    researchProject_Goal: z.string(),
    researchProject_Result: z.string(),
  });

export const FormAddPostSchema: ZodType<TFormAddPost> = z.object({
  title: z.string(),
  // content: z.string(),
  // dateUpload: z.string().date() || z.date(),
  // filePath: z.any(),
});

export const FormAddCompetitonSchema: ZodType<TFormAddCompetition> = z.object({
  competitionName: z.string(),
  description: z.string(),
  destination: z.string(),
});

export const FormAddContributorSchema: ZodType<TFormAddContributor> = z.object({
  name: z.string(),
  email: z.string(),
  numberPhone: z.string(),
  // dateOfBirth: z.string(),
  sex: z.string(),
  // roleName: z.string(),
});
export const FormReviewAssignment: ZodType<TFormReviewAssignment> = z.object({
  review_CommitteeId: z.string(),
});
export const FormAddReviewerSchema: ZodType<TFormAddReviewer> = z.object({
  name: z.string(),
  email: z.string(),
  numberPhone: z.string(),
  sex: z.string(),
  description: z.string(),
});

export const FormUpdateAuthorSchema: ZodType<TFormUpdateAuthor> = z.object({
  name: z.string(),
  email: z.string(),
  numberPhone: z.string(),
  // dateOfBirth: z.string(),
  sex: z.string(),
  facultyId: z.string(),
});

export const FormUpdateOrganizerSchema: ZodType<TFormUpdateOrganizer> =
  z.object({
    name: z.string(),
    email: z.string(),
    numberPhone: z.string(),
    facultyId: z.string(),
    description: z.string(),
  });

export const FormReviewTopicSchema: ZodType<TFormReviewTopic> = z.object({
  content: z.string(),
  concludeId: z.string(),
});

export const FormEstablishReviewCouncil: ZodType<TFormEstablishReviewCouncil> =
  z.object({
    name: z.string(),
  });
