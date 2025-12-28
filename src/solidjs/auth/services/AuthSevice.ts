import type { CoreTypes } from "@core/types";

import { FetchService } from "@core/services";
import { API_URL } from "astro:env/client";

export class AuthService {
  static async login(body: FormData) {
    return FetchService.post<void>(`${API_URL}/api/login`, {
      body,
    });
  }

  static async signup(body: FormData) {
    return FetchService.post<CoreTypes.ErrorFetch>(`${API_URL}/api/signup`, {
      body,
    });
  }
}
