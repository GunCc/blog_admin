// 可以为空 类型为 T
declare type Nullable<T> = T | null;

declare type Recordable<T = any> = Record<string, T>;
