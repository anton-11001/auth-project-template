import type { NextFunction, Request, Response } from "express";
interface RequestValidationData {
  body?: unknown;
  params?: Record<string, string>;
  query?: Request["query"];
}

interface RequestSchema {
  parse(data: RequestValidationData): RequestValidationData;
}

export const validate =
  (schema: RequestSchema) =>
  (request: Request, _response: Response, next: NextFunction): void => {
    const parsedData: RequestValidationData = schema.parse({
      body: request.body,
      params: request.params,
      query: request.query,
    });

    request.body = parsedData.body ?? {};
    request.params = parsedData.params ?? {};
    request.query = parsedData.query ?? {};

    next();
  };
