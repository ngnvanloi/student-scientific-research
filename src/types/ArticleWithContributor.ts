import { Contributor } from "./Contributor";

export type ArticleWithContributors = {
  id: number;
  title: string;
  description: string;
  keyWord: string;
  filePath: string;
  dateUpload: string;
  disciplineId: number;
  disciplineName: string;
  isAcceptedForPublication: boolean;
  coAuthors?: Contributor[];
};
