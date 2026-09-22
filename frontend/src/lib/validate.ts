




export function isString(v: unknown, min = 0, max = Infinity): v is string {
  return typeof v === "string" && v.length >= min && v.length <= max;
}

export function isNonEmptyString(v: unknown, max = Infinity): v is string {
  return isString(v, 1, max) && v.trim().length > 0;
}

export function isBool(v: unknown): v is boolean {
  return typeof v === "boolean";
}

export function isNumber(v: unknown, min = -Infinity, max = Infinity): v is number {
  return typeof v === "number" && Number.isFinite(v) && v >= min && v <= max;
}

export function isOneOf<T extends string>(v: unknown, allowed: readonly T[]): v is T {
  return typeof v === "string" && (allowed as readonly string[]).includes(v);
}

export function isUuid(v: unknown): v is string {
  return typeof v === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
}

export function isTicker(v: unknown): v is string {
  return typeof v === "string" && /^[A-Z0-9.\-]{1,10}$/.test(v);
}
