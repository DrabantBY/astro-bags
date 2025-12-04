import type { FormTypes } from "@solidjs/types";

import { createSignal, Show } from "solid-js";

import { AuthService } from "@auth/services";
import { InputField } from "@solidjs/components";

import styles from "./styles.module.css";

export const ResetForm = (props: FormTypes.FormProps) => {
  const [message, setMessage] = createSignal("");

  const onSubmit = async (e: FormTypes.FormEvent) => {
    e.preventDefault();
    const data = await AuthService.login(new FormData(e.currentTarget));

    if (data && data.status === "error") {
      setMessage(data.message);
      return;
    }
  };

  return (
    <form class={styles.form} name="reset" onSubmit={onSubmit} novalidate>
      <InputField type="email" name="email" label="email" required />

      <button
        class="link"
        type="button"
        onClick={() => props.setFormName("LOGIN")}
      >
        Back to login
      </button>

      <Show when={message()}>
        <p class={styles.message}>{message()}</p>
      </Show>

      <div class={styles.actions}>
        <button class="action" type="submit">
          confirm
        </button>
      </div>
    </form>
  );
};
