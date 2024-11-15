export type ReviewCouncilWithMembers = {
  id: number;
  reviewCommitteeName: string;
  competitionId: number;
  competitionName: string;
  dateStart: string;
  dateEnd: string;
  reviewBoardMembers: MemberOfCouncil[];
};

export type MemberOfCouncil = {
  isStatus?: boolean;
  description?: string;
  id: number;
  name: string;
  dateOfBirth: string;
  numberPhone: string;
  facultyId: number;
  facultyName: string;
  accountId: number;
  email: string;
  sex: string;

  // bonus
  academicDegree: null;
  academicRank: null;
};
