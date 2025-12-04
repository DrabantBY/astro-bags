import type { FormTypes } from "@solidjs/types";

import { createSignal, Show } from "solid-js";

import { AuthService } from "@auth/services";
import { InputField } from "@solidjs/components";

import styles from "./styles.module.css";

export const LoginForm = (props: FormTypes.FormProps) => {
  const [message, setMessage] = createSignal("");

  const onSubmit = async (e: FormTypes.FormEvent) => {
    e.preventDefault();
    const data = await AuthService.login(new FormData(e.currentTarget));

    if (data && data.status === "error") {
      setMessage(data.message);
      return;
    }

    window.location.href = "/";
  };

  return (
    <form class={styles.form} name="login" onSubmit={onSubmit} novalidate>
      <InputField type="email" name="login" label="email" required />
      <InputField type="password" name="password" label="password" required />

      <button
        class="link"
        type="button"
        onClick={() => props.setFormName("RESET")}
      >
        Forgot your password?
      </button>

      <Show when={message()}>
        <p class={styles.message}>{message()}</p>
      </Show>

      <div class={styles.actions}>
        <button class="action" type="submit">
          login
        </button>

        <button
          class="action"
          type="button"
          onClick={() => props.setFormName("SIGNUP")}
        >
          create account
        </button>
      </div>
    </form>
  );
};
