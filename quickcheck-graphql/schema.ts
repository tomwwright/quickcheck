import { buildSchemaSync } from "type-graphql";
import { CheckResolver } from "./resolvers/Check";
import { ResultResolver } from "./resolvers/Result";

export const Schema = buildSchemaSync({
  resolvers: [CheckResolver, ResultResolver]
});
