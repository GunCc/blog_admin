import { defineComponent } from "vue";
import type { RouteMeta, RouteRecordRaw } from "vue-router";
import { RoleEnum } from "../enums/roleEnum";

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>);

// Pick 的方法 选择需要使用的字段 返回
// Omit 就是与之相反 选择不需要的 返回需要的 这里就是不需要meta
// @ts-ignore  这个可以忽略类型错误
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success';
  content?: string;
  dot?: boolean;
}

export interface Menu {
  name: string;
  icon?: string;
  path: string;
  // path 参数
  paramPath?: string;
  disabled?: boolean;
  children?: Menu[];
  orderNo?: number;
  roles?: RoleEnum[];
  meta?: Partial<RouteMeta>;
  tag?: MenuTag;
  hideMenu?: boolean;
}

export interface MenuModule {
  orderNo?: number;
  menu: Menu
}


export type AppRouteModule = AppRouteRecordRaw 
