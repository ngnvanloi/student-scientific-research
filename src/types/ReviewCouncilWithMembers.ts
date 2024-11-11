export type ReviewCouncilWithMembers = {
  id: number;
  reviewCommitteeName: string;
  competitionId: number;
  competitionName: string;
  dateStart: string | Date;
  dateEnd: string | Date;
  reviewBoardMembers: MemberOfCouncil[];
};

export type MemberOfCouncil = {
  isStatus: boolean;
  description: string;
  id: number;
  name: string;
  dateOfBirth: string | Date;
  numberPhone: string;
  facultyId: number;
  facultyName: string;
  accountId: number;
  email: string;
  sex: string;
};
