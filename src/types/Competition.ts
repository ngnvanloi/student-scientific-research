export type Competition = {
  id: number;
  competitionName: string;
  dateStart: string;
  dateEnd: string;
  dateEndSubmit: string;
  description: string;
  destination: string;
  organizerId: number;
  accountId: number;
  organizerName: string;
  status?: string;
};
