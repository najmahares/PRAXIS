export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

const CSRF_COOKIE = "praxis_csrf";
const CSRF_HEADER = "X-CSRF-Token";

export function getCsrfToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${CSRF_COOKIE}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function safeNextPath(
  value: string | null | undefined,
  fallback = "/dashboard",
): string {
  if (!value || typeof value !== "string") return fallback;
  if (!value.startsWith("/")) return fallback;
  if (value.startsWith("//")) return fallback;
  if (value.includes("\\")) return fallback;
  if (/[\r\n\t\0]/.test(value)) return fallback;
  return value;
}

const FRIENDLY_MESSAGES: Record<number, string> = {
  400: "That request could not be processed. Please check your details.",
  401: "Your session has expired. Please sign in again.",
  403: "You do not have permission to do that.",
  404: "We could not find what you were looking for.",
  409: "That conflicts with something that already exists.",
  422: "Some of the details you entered need attention.",
  429: "Too many attempts. Please wait a minute and try again.",
  500: "Something went wrong on our side. Please try again shortly.",
};

export function friendlyMessageFor(status: number): string {
  return FRIENDLY_MESSAGES[status] ?? "Something went wrong. Please try again.";
}

const STATE_CHANGING = new Set(["POST", "PUT", "PATCH", "DELETE"]);
const DEFAULT_TIMEOUT_MS = 15000;

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  signal?: AbortSignal;
  timeoutMs?: number;
};

export async function request<T>(
  url: string,
  options: RequestOptions = {},
): Promise<T> {
  const method = options.method ?? "GET";
  const headers: Record<string, string> = { Accept: "application/json" };
  if (options.body !== undefined) headers["Content-Type"] = "application/json";

  if (STATE_CHANGING.has(method)) {
    const csrf = getCsrfToken();
    if (csrf) headers[CSRF_HEADER] = csrf;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
  );
  if (options.signal) {
    options.signal.addEventListener("abort", () => controller.abort());
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body:
        options.body === undefined ? undefined : JSON.stringify(options.body),
      credentials: "include",
      signal: controller.signal,
    });
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError(
        0,
        "timeout",
        "The request took too long. Please try again.",
      );
    }
    throw new ApiError(
      0,
      "network",
      "We could not reach the server. Check your connection and try again.",
    );
  }
  clearTimeout(timeoutId);

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `http_${response.status}`,
      friendlyMessageFor(response.status),
    );
  }

  if (response.status === 204) return undefined as T;

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return undefined as T;
  return (await response.json()) as T;
}
