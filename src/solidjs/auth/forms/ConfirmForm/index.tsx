import type { FormTypes } from "@solidjs/types";
import type { AuthTypes } from "@solidjs/auth/types";

import { createSignal, Show } from "solid-js";

import { AuthService } from "@auth/services";
import { InputField } from "@solidjs/components";

import styles from "@solidjs/auth/styles.module.css";

export const ConfirmForm = (props: AuthTypes.FormProps) => {
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
    <form class={styles.form} name="confirm" onSubmit={onSubmit} novalidate>
      <InputField
        type="password"
        name="password"
        label="enter  password"
        required
      />

      <InputField
        type="password"
        name="repeat"
        label="repeat password"
        required
      />

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
        <button class="action" type="submit" disabled={disable()}>
          confirm
        </button>
      </div>
    </form>
  );
};
