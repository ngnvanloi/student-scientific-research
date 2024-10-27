export type Notification = {
  id: number;
  notificationContent: string;
  notificationDate: string;
  recevierId: number;
  recevierName?: string;
  senderId: number;
  notificationTypeId: number;
  notificationTypeName: string;
  targetId: number;
  status: boolean;
};
