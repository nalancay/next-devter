const isSuccessful = (statusCode: number): boolean =>
  statusCode >= 200 && statusCode < 400;

const getMethod = (method: string = "get"): string => {
  const validMethods = ["get", "post", "patch", "delete", "put"];
  if (validMethods.includes(method.toLowerCase())) {
    return method.toUpperCase();
  }

  throw new Error(`Wrong method used. ${method} is not a valid method.`);
};

const getHeaders = (
  originalHeaders: Record<string, string> = {}
): Record<string, string> => {
  const headers = {
    ...originalHeaders,
  };

  return headers;
};

const getBody = (body: any, headers: Record<string, string>): any => {
  const contentType = headers["Content-Type"] ? headers["Content-Type"] : null;

  if (contentType === "application/json" && body != null) {
    return JSON.stringify(body);
  }
  return body;
};

interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

interface RequestResult {
  data: any;
  status: number;
  isSuccessful: boolean;
}

const makeRequest = async ({
  URL_ENDPOINT,
  options = {},
}: {
  URL_ENDPOINT: string;
  options?: RequestOptions;
}): Promise<RequestResult> => {
  const { method: rawMethod, headers: rawHeaders, body: rawBody } = options;
  const method = getMethod(rawMethod);
  const headers = getHeaders(rawHeaders);
  const body = getBody(rawBody, headers);

  const response = await fetch(URL_ENDPOINT, { body, method, headers });
  const code = response.status;
  const parsedResponse = await response.json();
  return {
    data: parsedResponse,
    status: code,
    isSuccessful: isSuccessful(code),
  };
};

export { makeRequest };
