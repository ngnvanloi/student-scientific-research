export type Notification = {
  id: number;
  notificationContent: string;
  notificationDate: string;
  recevierId: number;
  recevierName: string;
  recevierEmail: string;
  senderId: number;
  senderName: string;
  senderEmail: string;
  notificationTypeId: number;
  notificationTypeName: string;
  targetId: number;
  status: boolean;
};
