import { Pagination } from "./common";

export type AdminNotification = {
  id: string;
  userId: string;
  userName: string;
  message: string;
  date: string;
  read: boolean;
};

export type AdminNotificationsDto = {
  notifications: AdminNotification[];
  pagination: Pagination;
};
