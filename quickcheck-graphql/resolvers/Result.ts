import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { GraphQLDateTime } from "graphql-iso-date";
import { Result } from "../models/Result";
import { ResultService } from "../services/ResultService";

@Resolver()
export class ResultResolver {
  @Query(returns => Result)
  async getResultById(@Arg("resultId") resultId: string): Promise<Result> {
    return ResultService.getById(resultId);
  }

  @Query(returns => [Result])
  async getResultsByDatetimeRange(
    @Arg("checkId") checkId: string,
    @Arg("startDatetime", type => GraphQLDateTime) startDatetime: Date,
    @Arg("endDatetime", type => GraphQLDateTime, { nullable: true })
    endDatetime?: Date
  ): Promise<Result[]> {
    return ResultService.getByDatetimeRange(
      checkId,
      startDatetime,
      endDatetime || new Date()
    );
  }

  @Mutation(returns => Result)
  async putResult(@Arg("result") result: Result): Promise<Result> {
    return ResultService.put(result);
  }
}
