import type { FormTypes } from "@solidjs/types";
import type { AuthTypes } from "@solidjs/auth/types";

import { Show } from "solid-js";
import { createStore, produce } from "solid-js/store";

import { AuthService } from "@auth/services";
import { InputField } from "@solidjs/components";

import styles from "@solidjs/auth/styles.module.css";

export const LoginForm = (props: AuthTypes.FormProps) => {
  const [formStore, setFormStore] = createStore({
    message: "",
    pending: false,
  });

  const onSubmit = async (e: FormTypes.FormEvent) => {
    setFormStore(
      produce((store) => {
        store.pending = !store.pending;
      }),
    );
    e.preventDefault();
    const data = await AuthService.login(new FormData(e.currentTarget));

    if (data && data.status === "error") {
      setFormStore(
        produce((store) => {
          store.pending = !store.pending;
          store.message = data.message;
        }),
      );

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

      <Show when={formStore.message}>
        <p class={styles.message}>{formStore.message}</p>
      </Show>

      <div class={styles.actions}>
        <button class="action" type="submit" disabled={formStore.pending}>
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
