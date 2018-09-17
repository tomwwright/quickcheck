import * as RequestLib from "request-promise-native";

import { Request } from "quickcheck";
 
export type RequestResult = {
  failed: boolean;
  failureReason?: string;
  statusCode?: number;
  body?: string;
  responseHeaders?: { [header: string]: string };
  datetime: string;
  elapsedMillis: number;
};

export const RequestService = {
  performRequest: async (params: Request): Promise<RequestResult> => {
    const startMillis = Date.now();
    try {
      const response: RequestLib.FullResponse = await RequestLib({
        uri: params.uri,
        method: params.method,
        headers: params.headers,
        resolveWithFullResponse: true
      });

      // headers can be string | string[], collapse and string[] values
      const responseHeaders: { [header: string]: string } = {};
      for (const key in response.headers) {
        const header = response.headers[key];
        responseHeaders[key] = Array.isArray(header)
          ? "".concat(...header)
          : header;
      }

      return {
        failed: false,
        statusCode: response.statusCode,
        responseHeaders: responseHeaders,
        body: response.body,
        datetime: new Date(startMillis).toISOString(),
        elapsedMillis: Date.now() - startMillis
      };
    } catch (error) {
      return {
        failed: true,
        failureReason: error.message,
        datetime: new Date(startMillis).toISOString(),
        elapsedMillis: Date.now() - startMillis
      };
    }
  }
};
