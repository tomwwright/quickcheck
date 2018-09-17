import {
  attribute,
  autoGeneratedHashKey,
  table
} from "@aws/dynamodb-data-mapper-annotations";

import { Request, Notification, Schedule, Check as CheckType } from 'quickcheck';

@table("Checks")
export class Check implements CheckType {
  @autoGeneratedHashKey()
  checkId: string;

  @attribute()
  name: string;

  @attribute()
  enabled: boolean;

  @attribute()
  schedule: Schedule;

  @attribute()
  scheduleOffsetSeconds: number;

  @attribute()
  notifications: Notification[];

  @attribute()
  request: Request;
}
