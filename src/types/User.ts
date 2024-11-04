type TUser = {
  // share
  id: number;
  name: string;
  numberPhone: string;
  facultyId: number;
  facultyName: string;
  accountId: number;
  email: string;

  // author
  sex: string;
  internalCode: string | any;
  dateOfBirth: string;

  // for reviewer
  academicDegree: string;
  academicRank: string;

  // for organizer
  description: string;
};
