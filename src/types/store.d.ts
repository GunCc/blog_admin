import { ErrorTypeEnum } from '@/enums/exceptionEnum';

import { Action, Getter, Mutation } from "vuex";

export interface UserInfo {
  userId: string | number;
}


export interface ErrorLogInfo {
  type: ErrorTypeEnum;
  file: string;
  name?: string;
  mesaage?: string;
  stack?: string;
  detail: string;
  url: string;
  time?: string;
}