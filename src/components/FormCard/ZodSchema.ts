import { string, z, ZodType } from "zod";
import {
  TFormAddCompetition,
  TFormAddContributor,
  TFormAddPost,
  TFormApprovalRegistration,
  TFormLoginData,
  TFormRegisterData,
  TFormSubmitArticle,
  TFormSubmitResearchProjectTabGoalResult,
  TFormSubmitResearchProjectTabOveriew,
  TFormUpdateAuthor,
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

export const FormUpdateAuthorSchema: ZodType<TFormUpdateAuthor> = z.object({
  name: z.string(),
  email: z.string(),
  numberPhone: z.string(),
  // dateOfBirth: z.string(),
  sex: z.string(),
  // roleName: z.string(),
});
