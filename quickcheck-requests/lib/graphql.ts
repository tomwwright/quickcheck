import * as RequestLib from "request-promise-native";

import { getParameter } from "./params";

const config = {
  graphQlUri: getParameter("GRAPHQL_URI")
};

export const GraphQL = {
  query: async <T>(
    query: string,
    variables: { [key: string]: any }
  ): Promise<T> => {
    const response: T = await RequestLib({
      uri: config.graphQlUri,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      json: true,
      body: {
        query,
        variables
      }
    });

    return response;
  }
};
