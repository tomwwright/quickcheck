import "reflect-metadata";
import {
  ObjectType as GraphQLObjectType,
  InputType as GraphQLInputType,
  Field as GraphQLField
} from "type-graphql";
import * as GraphQLJSON from "graphql-type-json";
import { Request as RequestType } from "quickcheck";

@GraphQLObjectType()
@GraphQLInputType("RequestInput")
export class Request implements RequestType {
  @GraphQLField()
  uri: string;

  @GraphQLField()
  method: "get" | "head" | "put" | "post" | "patch" | "delete";

  @GraphQLField(type => GraphQLJSON)
  headers: { [key: string]: string };

  @GraphQLField({ nullable: true })
  body?: string;
}
