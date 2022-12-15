
/**
 * @desc 判断数据是不是该类型
 * @param val 数据
 * @param type 类型
 */
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

// 是有效值
export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== "undefined";
}

// 空值
export function isNull(val: unknown): val is null {
  return val === null;
}

// 无效值
export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}

// 是否为空值或者无效值
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val);
}


// 是否为对象
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

// 是否为方法
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

// 是否为字符串
export function isString(val: unknown): val is string {
  return is(val, "String");
}

// 是否为一个地址
export function isUrl(path: string): boolean {
  const reg =
    /^(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?(\/#\/)?(?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}
