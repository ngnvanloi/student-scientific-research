import { z, ZodType } from "zod";
import {
  TFormAddCompetition,
  TFormAddContributor,
  TFormAddPost,
  TFormAddReviewer,
  TFormApprovalRegistration,
  TFormApprovedAcceptance,
  TFormAskAI,
  TFormCreateAcceptance,
  TFormCreateBackup,
  TFormEmail,
  TFormEstablishReviewCouncil,
  TFormFilter,
  TFormLoginData,
  TFormRegisterData,
  TFormRequestAcceptanceDeadline,
  TFormResetPassword,
  TFormReviewAssignment,
  TFormReviewTopic,
  TFormSendEmail,
  TFormSubmitArticle,
  TFormSubmitNewTopicVersion,
  TFormSubmitResearchProjectTabGoalResult,
  TFormSubmitResearchProjectTabOveriew,
  TFormSubmitResearchTopic,
  TFormUpdateArticle,
  TFormUpdateAuthor,
  TFormUpdateOrganizer,
  TFormUpdateReviewer,
} from "./FormInputsData";
import { DEFAULT_TEXTAREA_LENGTH } from "@/lib/enum";

export const FormLoginSchema: ZodType<TFormLoginData> = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Mật khẩu chứa ít nhất 8 ký tự" })
    .regex(/[A-Z]/, {
      message: "Mật khẩu phải chứa ít nhất một chữ cái in hoa",
    })
    .regex(/[a-z]/, {
      message: "Mật khẩu phải chứa ít nhất một chữ cái thường",
    })
    .regex(/[0-9]/, { message: "Mật khẩu phải chứa ít nhất một số" })
    .regex(/[@$!%*?&]/, {
      message:
        "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (@, $, !, %, *, ?, &)",
    }),
});

export const FormRegisterSchema: ZodType<TFormRegisterData> = z.object({
  name: z.string(),
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z
    .string()
    .min(8, { message: "Mật khẩu chứa ít nhất 8 ký tự" })
    .regex(/[A-Z]/, {
      message: "Mật khẩu phải chứa ít nhất một chữ cái in hoa",
    })
    .regex(/[a-z]/, {
      message: "Mật khẩu phải chứa ít nhất một chữ cái thường",
    })
    .regex(/[0-9]/, { message: "Mật khẩu phải chứa ít nhất một số" })
    .regex(/[@$!%*?&]/, {
      message:
        "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (@, $, !, %, *, ?, &)",
    }),
  numberPhone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, { message: "Số điện thoại không hợp lệ" }),
  roleName: z.string().optional(),
});
export const FormVerifyEmailSchema: ZodType<TFormEmail> = z.object({
  email: z.string().email(),
});

export const FormResetPasswordSchema: ZodType<TFormResetPassword> = z
  .object({
    password: z
      .string()
      .min(8, { message: "Mật khẩu chứa ít nhất 8 ký tự" })
      .regex(/[A-Z]/, {
        message: "Mật khẩu phải chứa ít nhất một chữ cái in hoa",
      })
      .regex(/[a-z]/, {
        message: "Mật khẩu phải chứa ít nhất một chữ cái thường",
      })
      .regex(/[0-9]/, { message: "Mật khẩu phải chứa ít nhất một số" })
      .regex(/[@$!%*?&]/, {
        message:
          "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (@, $, !, %, *, ?, &)",
      }),
    newPassword: z
      .string()
      .min(8, { message: "Mật khẩu chứa ít nhất 8 ký tự" })
      .regex(/[A-Z]/, {
        message: "Mật khẩu phải chứa ít nhất một chữ cái in hoa",
      })
      .regex(/[a-z]/, {
        message: "Mật khẩu phải chứa ít nhất một chữ cái thường",
      })
      .regex(/[0-9]/, { message: "Mật khẩu phải chứa ít nhất một số" })
      .regex(/[@$!%*?&]/, {
        message:
          "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (@, $, !, %, *, ?, &)",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Mật khẩu chứa ít nhất 8 ký tự" })
      .regex(/[A-Z]/, {
        message: "Mật khẩu phải chứa ít nhất một chữ cái in hoa",
      })
      .regex(/[a-z]/, {
        message: "Mật khẩu phải chứa ít nhất một chữ cái thường",
      })
      .regex(/[0-9]/, { message: "Mật khẩu phải chứa ít nhất một số" })
      .regex(/[@$!%*?&]/, {
        message:
          "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (@, $, !, %, *, ?, &)",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp với mật khẩu mới",
    path: ["confirmPassword"], // Đặt lỗi tại confirmPassword nếu không khớp
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
  title: z.string({ message: "Vui lòng điền tiêu đề bài báo" }),
  // description: z.string(),
  // dateUpload: z.string().date(),
  // keywords: z.array(string()),
  // filePath: z.string(),
  disciplineId: z.string(),
});
export const FormSubmitResearchTopicc: ZodType<TFormSubmitResearchTopic> =
  z.object({
    nameTopic: z.string(),
    description: z
      .string()
      .refine(
        (value) => value.trim().split(/\s+/).length >= DEFAULT_TEXTAREA_LENGTH,
        {
          message: `Mô tả phải chứa ít nhất ${DEFAULT_TEXTAREA_LENGTH} từ`,
        }
      ),
    target: z
      .string()
      .refine(
        (value) => value.trim().split(/\s+/).length >= DEFAULT_TEXTAREA_LENGTH,
        {
          message: `Mục tiêu phải chứa ít nhất ${DEFAULT_TEXTAREA_LENGTH} từ`,
        }
      ),
    achievedResults: z
      .string()
      .refine(
        (value) => value.trim().split(/\s+/).length >= DEFAULT_TEXTAREA_LENGTH,
        {
          message: `Kết quả đạt được phải chứa ít nhất ${DEFAULT_TEXTAREA_LENGTH} từ`,
        }
      ),
    budget: z
      .number()
      .positive({ message: "Dự trù kinh phí phải là số dương" })
      .max(1000000000, { message: "Dự trù kinh phí không được vượt quá 1 tỷ" })
      .refine((value) => Number.isFinite(value), {
        message: "Dự trù kinh phí phải là một số hợp lệ",
      })
      .refine((value) => /^\d+(\.\d{1,2})?$/.test(value.toString()), {
        message: "Dự trù kinh phí chỉ được có tối đa 2 chữ số sau dấu phẩy",
      }),
    projectDuration: z
      .number()
      .int({ message: "Thời gian nghiệm thu đề tài án phải là số nguyên" })
      .min(1, {
        message: "Thời gian nghiệm thu đề tài án phải ít nhất là 1 tháng",
      })
      .max(12, {
        message: "Thời gian nghiệm thu đề tài án không thể vượt quá 12 tháng",
      }),
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
    description: z
      .string()
      .refine(
        (value) => value.trim().split(/\s+/).length >= DEFAULT_TEXTAREA_LENGTH,
        {
          message: `Mô tả phải chứa ít nhất ${DEFAULT_TEXTAREA_LENGTH} từ`,
        }
      ),
    target: z
      .string()
      .refine(
        (value) => value.trim().split(/\s+/).length >= DEFAULT_TEXTAREA_LENGTH,
        {
          message: `Mục tiêu phải chứa ít nhất ${DEFAULT_TEXTAREA_LENGTH} từ`,
        }
      ),
    achievedResults: z
      .string()
      .refine(
        (value) => value.trim().split(/\s+/).length >= DEFAULT_TEXTAREA_LENGTH,
        {
          message: `Kết quả đạt được phải chứa ít nhất ${DEFAULT_TEXTAREA_LENGTH} từ`,
        }
      ),
    budget: z
      .number()
      .positive({ message: "Dự trù kinh phí phải là số dương" })
      .max(1000000000, { message: "Dự trù kinh phí không được vượt quá 1 tỷ" })
      .refine((value) => Number.isFinite(value), {
        message: "Dự trù kinh phí phải là một số hợp lệ",
      })
      .refine((value) => /^\d+(\.\d{1,2})?$/.test(value.toString()), {
        message: "Dự trù kinh phí chỉ được có tối đa 2 chữ số sau dấu phẩy",
      }),
    projectDuration: z
      .number()
      .int({ message: "Thời gian nghiệm thu đề tài án phải là số nguyên" })
      .min(1, {
        message: "Thời gian nghiệm thu đề tài án phải ít nhất là 1 tháng",
      })
      .max(12, {
        message: "Thời gian nghiệm thu đề tài án không thể vượt quá 12 tháng",
      }),
    supervisor: z.string(),
    summary: z.string().optional(),
    productFilePath: z.string().optional(),
    budgetFilePath: z.string().optional(),
    reportFilePath: z.string().optional(),
    articleId: z.string().optional(),
    disciplineId: z.string(),
    competitionId: z.number(),

    // dành cho nội dung cập nhật nghiệm thu
    contentForUpdateAcceptance: z.string().optional(),
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
  description: z
    .string()
    .refine(
      (value) => value.trim().split(/\s+/).length >= DEFAULT_TEXTAREA_LENGTH,
      {
        message: `Mô tả cuộc thi phải chứa ít nhất ${DEFAULT_TEXTAREA_LENGTH} từ`,
      }
    ),
  destination: z.string(),
});

export const FormAddContributorSchema: ZodType<TFormAddContributor> = z.object({
  name: z.string(),
  email: z.string().email({ message: "Email không hợp lệ" }),
  numberPhone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, { message: "Số điện thoại không hợp lệ" }),
  // dateOfBirth: z.string(),
  sex: z.string(),
  // roleName: z.string(),
});
export const FormReviewAssignment: ZodType<TFormReviewAssignment> = z.object({
  review_CommitteeId: z.string(),
});
export const FormAddReviewerSchema: ZodType<TFormAddReviewer> = z.object({
  name: z.string(),
  email: z.string().email({ message: "Email không hợp lệ" }),
  numberPhone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, { message: "Số điện thoại không hợp lệ" }),
  sex: z.string(),
  description: z.string(),
});

export const FormUpdateAuthorSchema: ZodType<TFormUpdateAuthor> = z.object({
  name: z.string(),
  email: z.string().email({ message: "Email không hợp lệ" }),
  numberPhone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, { message: "Số điện thoại không hợp lệ" }),
  // dateOfBirth: z.string(),
  sex: z.string(),
  facultyId: z.string(),
});

export const FormUpdateReviewerSchema: ZodType<TFormUpdateReviewer> = z.object({
  name: z.string(),
  email: z.string().email({ message: "Email không hợp lệ" }),
  numberPhone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, { message: "Số điện thoại không hợp lệ" }),
  // dateOfBirth: z.string(),
  sex: z.string(),
  facultyId: z.string(),

  academicRank: z.string(),
  academicDegree: z.string(),
});

export const FormUpdateOrganizerSchema: ZodType<TFormUpdateOrganizer> =
  z.object({
    name: z.string(),
    email: z.string().email({ message: "Email không hợp lệ" }),
    numberPhone: z
      .string()
      .regex(/^\+?[0-9]{10,15}$/, { message: "Số điện thoại không hợp lệ" }),
    facultyId: z.string(),
    description: z.string(),
  });

export const FormReviewTopicSchema: ZodType<TFormReviewTopic> = z.object({
  content: z.string(),
  concludeId: z.string(),
});

export const FormApprovedAcceptanceSchema: ZodType<TFormApprovedAcceptance> =
  z.object({
    description: z.string(),
    isAccepted: z.string(),
  });
export const FormCreateBackupSchema: ZodType<TFormCreateBackup> = z.object({
  backupType: z.string(),
  backupPath: z
    .string()
    .refine(
      (path) =>
        /^[a-zA-Z]:\\(?:[^\\:*?"<>|\r\n]+\\)*[^\\:*?"<>|\r\n]*$/.test(path),
      {
        message: "File path không hợp lệ !",
      }
    ),
});

export const FormEstablishReviewCouncil: ZodType<TFormEstablishReviewCouncil> =
  z.object({
    name: z.string(),
  });

export const FormCreateAcceptanceSchema: ZodType<TFormCreateAcceptance> =
  z.object({
    name: z.string(),
    researchTopicId: z.string(),
  });

export const FormFilterSchema: ZodType<TFormFilter> = z.object({
  competitionId: z.string().optional(),
  facultyId: z.string().optional(),
  roleName: z.string().optional(),
});

export const FormRequestAcceptanceDeadlineSchema: ZodType<TFormRequestAcceptanceDeadline> =
  z.object({
    month: z.number().optional(),
    message: z.string().optional(),
  });
export const FormSendEmailSchema: ZodType<TFormSendEmail> = z.object({
  receiverEmail: z.string().email({ message: "Email không hợp lệ" }),
  receiverName: z.string().optional(),
  subject: z.string(),
  content: z.string(),
});

export const FormAskAISchema: ZodType<TFormAskAI> = z.object({
  prompt: z.string(),
});
