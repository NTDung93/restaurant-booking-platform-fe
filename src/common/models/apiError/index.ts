export interface ApiError {
  message: string;
  code?: string | null;
  httpStatusCode: number;
}
