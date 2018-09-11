import * as RequestLib from "request-promise-native";

import { getParameter } from "./params";

const config = {
  graphQlUri: getParameter("GRAPHQL_URI"),
  graphQlApiKey: getParameter("GRAPHQL_API_KEY")
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
        Accept: "application/json",
        "x-api-key": config.graphQlApiKey
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
