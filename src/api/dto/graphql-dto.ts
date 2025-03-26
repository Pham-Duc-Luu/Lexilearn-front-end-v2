import { ErrorResponseDto } from "./error-dto";

export interface GraphqlErrorResponse {
  message: string;
  path: string[];
  extensions: {
    errorType: string;
    debugInfo: {
      errorDetails: ErrorResponseDto;
    };
  };
}
