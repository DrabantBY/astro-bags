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
    // props.setFormName("ACTIVATE");

    const data = await AuthService.signup(new FormData(e.currentTarget));

    if (data && data.status === "error") {
      setMessage(data.message);
      setDisable((prev) => !prev);
      return;
    }

    props.setInfoNote(data.message);
  };

  return (
    <form class={styles.form} name="signup" onSubmit={onSubmit} novalidate>
      <InputField
        type="email"
        name="email"
        label="email"
        required
        pattern="[\w\d]{3,}@[a-z]{2,}\.[a-z]+"
        patternErrorMessage="value is not an email"
      />
      <InputField
        type="password"
        name="password"
        label="password"
        required
        pattern=".{4,}"
        patternErrorMessage="min 4 characters"
      />

      <InputField
        type="password"
        name="passwordrepeat"
        label="repeat password"
        required
        pattern=".{4,}"
        patternErrorMessage="min 4 characters"
      />

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
          create
        </button>
      </div>
    </form>
  );
};
