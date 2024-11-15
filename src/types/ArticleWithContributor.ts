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
  acceptedForPublicationStatus: number;
  author_Articles: Author_Articles[];

  // invaluable
  // coAuthors?: Contributor[];
  // isAcceptedForPublication?: boolean;
};
export type Author_Articles = {
  id: number;
  authorId: number;
  articleId: number;
  roleName: string;
  author: {
    id: number;
    name: string;
    dateOfBirth: string;
    sex: string;
    numberPhone: string;
    facultyId: number;
    facultyName: string;
    internalCode: string;
    accountId: number;
    email: string;
  };
  deletedAt: any;
};
