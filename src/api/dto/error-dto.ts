import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type HttpError = "UNAUTHENTICATED";

export type ErrorResponseDto = Partial<{
  timestamp: string;
  status: number;
  error: string | HttpError;
  message: string;
  path: string;
}>;

export type FetchQueryError = FetchBaseQueryError;
