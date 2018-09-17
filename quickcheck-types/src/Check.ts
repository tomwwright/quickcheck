import { Notification } from './Notification';
import { Schedule } from './Schedule';
import { Request } from './Request';

export interface Check {
    checkId: string;
    name: string;
    enabled: boolean;
    schedule: Schedule;
    scheduleOffsetSeconds: number;
    notifications: Notification[];
    request: Request;
}