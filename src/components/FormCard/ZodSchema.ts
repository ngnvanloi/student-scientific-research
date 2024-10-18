import { z, ZodType } from "zod";
import {
  TFormLoginData,
  TFormSubmitResearchProjectTabGoalResult,
  TFormSubmitResearchProjectTabOveriew,
} from "./FormInputsData";

export const FormLoginSchema: ZodType<TFormLoginData> = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
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

export const FormTabGoalResultSchema: ZodType<TFormSubmitResearchProjectTabGoalResult> =
  z.object({
    researchProject_Goal: z.string(),
    researchProject_Result: z.string(),
  });
