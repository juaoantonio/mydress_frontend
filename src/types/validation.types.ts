export type ValidationErrorReturn = {
  code: number;
  errors: { field: string; messages: string[] }[];
};
