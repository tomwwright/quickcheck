import { Notification } from "./Notification";
import { Request } from "./Request";

export interface Result {
  resultId?: string;
  checkId: string;
  request: Request;
  datetime: string;
  elapsedMillis: number;
  statusCode?: number;
  responseHeaders?: { [key: string]: string };
  body?: string;
  message: string;
  sentNotifications: Notification[];
}
