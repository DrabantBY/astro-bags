import { FetchService } from "@core/services";

export class AuthService {
  static async login(body: FormData) {
    return FetchService.post<void>(
      "https://sandbox.salesolutions.by/api/login",
      {
        body,
      },
    );
  }
}
