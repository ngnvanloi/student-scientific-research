export type RegistrationForm = {
  id: number;
  authorId: number;
  accountId: number;
  authorName: string;
  internalCode?: any;
  competitionId: number;
  competitionName: string;
  dateStart: string;
  dateEnd: string;
  filePath: string;
  isAccepted: number;
};
