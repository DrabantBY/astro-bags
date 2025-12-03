import type { CoreTypes } from "@core/types";

type FetchParams = {
  params?: Record<string, string>;
  headers?: Record<string, string>;
  credentials?: boolean;
  body?: BodyInit;
  signal?: AbortSignal | null;
};

export class FetchService {
  static #defaultHeader = {
    "Content-Type": "application/json",
  };

  static async #defaultFetch<T = void>(
    method: string,
    url: string,
    options?: FetchParams,
  ): Promise<T | CoreTypes.ErrorFetch> {
    const response = await fetch(
      `${url}${options?.params ? "?" : ""}${new URLSearchParams(options?.params)}`,
      {
        method,
        headers:
          options?.body instanceof FormData
            ? options?.headers
            : Object.assign(this.#defaultHeader, options?.headers),
        credentials: options?.credentials ? "include" : "same-origin",
        body: options?.body,
        signal: options?.signal,
      },
    );

    return await response.json();
  }

  static get<T>(url: string, options?: FetchParams) {
    return this.#defaultFetch<T>("GET", url, options);
  }

  static post<T>(url: string, options?: FetchParams) {
    return this.#defaultFetch<T>("POST", url, options);
  }

  static put<T>(url: string, options?: FetchParams) {
    return this.#defaultFetch<T>("PUT", url, options);
  }

  static patch<T>(url: string, options?: FetchParams) {
    return this.#defaultFetch<T>("PATCH", url, options);
  }

  static delete<T>(url: string, options?: FetchParams) {
    return this.#defaultFetch<T>("DELETE", url, options);
  }
}
