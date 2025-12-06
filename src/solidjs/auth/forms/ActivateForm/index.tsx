import type { FormTypes } from "@solidjs/types";
import type { AuthTypes } from "@solidjs/auth/types";

import { createSignal, Show } from "solid-js";

import { AuthService } from "@auth/services";
import { InputField } from "@solidjs/components";

import styles from "@solidjs/auth/styles.module.css";

export const ActivateForm = (props: AuthTypes.FormProps) => {
  const [message, setMessage] = createSignal<string>("");
  const [disable, setDisable] = createSignal<boolean>(false);

  const onSubmit = async (e: FormTypes.FormEvent) => {
    setDisable((prev) => !prev);
    e.preventDefault();
    //TODO add new query
    const data = await AuthService.login(new FormData(e.currentTarget));

    if (data && data.status === "error") {
      setMessage(data.message);
      setDisable((prev) => !prev);
      return;
    }
  };

  return (
    <form class={styles.form} name="activate" onSubmit={onSubmit} novalidate>
      <InputField type="text" name="code" label="enter code" required />

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
          activate
        </button>
      </div>
    </form>
  );
};
