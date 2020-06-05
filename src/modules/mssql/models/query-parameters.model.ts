import { ResultType } from "./result-type.enum";

export class QueryParameter{
  label: string;
  type: string;
  value?: any;
  input: boolean;
  maxType?: number;
}

export interface IQueryParameters{
  isStoredProc: boolean;
  query: string;
  queryParams?: QueryParameter[];
  resultType?: ResultType;
}