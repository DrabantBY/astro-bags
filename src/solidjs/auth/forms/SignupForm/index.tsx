import type { FormTypes } from "@solidjs/types";
import type { AuthTypes } from "@solidjs/auth/types";

import { createSignal, Show } from "solid-js";

import { AuthService } from "@auth/services";
import { InputField } from "@solidjs/components";

import styles from "@solidjs/auth/styles.module.css";

export const SignupForm = (props: AuthTypes.FormProps) => {
  const [message, setMessage] = createSignal<string>("");
  const [disable, setDisable] = createSignal<boolean>(false);

  const onSubmit = async (e: FormTypes.FormEvent) => {
    setDisable((prev) => !prev);
    e.preventDefault();
    props.setFormName("ACTIVATE");

    // const data = await AuthService.login(new FormData(e.currentTarget));
    //
    // if (data && data.status === "error") {
    //   setMessage(data.message);
    //   setDisable((prev) => !prev);
    //   return;
    // }
    //
    // window.location.href = "/";
  };

  return (
    <form class={styles.form} name="signup" onSubmit={onSubmit} novalidate>
      <InputField type="text" name="firstname" label="first name" required />
      <InputField type="text" name="firstname" label="last name" required />
      <InputField type="email" name="email" label="email" required />
      <InputField type="password" name="password" label="password" required />

      <button
        class="link"
        type="button"
        onClick={() => props.setFormName("LOGIN")}
      >
        I already have an account
      </button>

      <Show when={message()}>
        <p class={styles.message}>{message()}</p>
      </Show>

      <div class={styles.actions}>
        <button class="action-contain" type="submit" disabled={disable()}>
          get code
        </button>
      </div>
    </form>
  );
};
