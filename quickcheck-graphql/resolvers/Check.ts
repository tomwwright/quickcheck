import { Resolver, Query, Arg } from "type-graphql";
import { Check } from "../models/Check";
import { CheckService } from "../services/CheckService";
import { Schedule } from "quickcheck";

@Resolver()
export class CheckResolver {
  @Query(returns => Check)
  async getCheckById(@Arg("checkId") checkId: string): Promise<Check> {
    return CheckService.getById(checkId);
  }

  @Query(returns => [Check])
  async getChecksBySchedule(
    @Arg("schedule") schedule: Schedule
  ): Promise<Check[]> {
    return CheckService.getBySchedule(schedule, false);
  }
}
