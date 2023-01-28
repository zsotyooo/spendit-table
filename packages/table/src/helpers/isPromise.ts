// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPromise<T = any>(value: T | Promise<T>): value is Promise<T> {
  return typeof (value as Promise<T>).then === "function";
}
