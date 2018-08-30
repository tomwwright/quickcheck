import * as RequestLib from "request-promise-native";

export type Request = {
  uri: string;
  method: string;
  headers: { [header: string]: string };
};

export type RequestResult = {
  failed: false;
  statusCode: number;
  statusMessage: string;
  body: string;
  requestTime: number;
  elapsedMillis: number;
};

export type RequestError = {
  failed: true;
  reason: string;
  requestTime: number;
  elapsedMillis: number;
};

export const RequestService = {
  performRequest: async (
    params: Request
  ): Promise<RequestResult | RequestError> => {
    const startMillis = Date.now();
    try {
      const response: RequestLib.FullResponse = await RequestLib({
        uri: params.uri,
        method: params.method,
        headers: params.headers,
        resolveWithFullResponse: true
      });

      return {
        statusCode: response.statusCode,
        statusMessage: response.statusMessage,
        body: response.body,
        failed: false,
        requestTime: startMillis,
        elapsedMillis: Date.now() - startMillis
      };
    } catch (error) {
      return {
        reason: error.message,
        requestTime: startMillis,
        elapsedMillis: Date.now() - startMillis,
        failed: true
      };
    }
  }
};
