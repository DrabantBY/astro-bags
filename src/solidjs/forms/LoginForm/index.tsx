import { createSignal, Show } from "solid-js";

import { AuthService } from "@auth/services";
import { InputField } from "@solidcomponents/index";

import styles from "./styles.module.css";

type SubmitFormEvent = SubmitEvent & {
  currentTarget: HTMLFormElement;
  target: Element;
};

export const LoginForm = () => {
  const [message, setMessage] = createSignal("");

  const onSubmit = async (e: SubmitFormEvent) => {
    e.preventDefault();
    const data = await AuthService.login(new FormData(e.currentTarget));
    if (data && data.status) {
      setMessage(data.message);
    }
  };

  return (
    <section class={styles.shell}>
      <figure class={styles.figure}>
        <img src="/monogram.png" alt="monogram picture" />
      </figure>

      <h2 class={styles.title}>I already have an account</h2>

      <p class={styles.text}>
        If you already have an account, please enter your email and password
      </p>

      <form class={styles.form} onSubmit={onSubmit}>
        <InputField type="email" name="login" label="email" required />
        <InputField type="password" name="password" label="password" required />

        <button class="link" type="button">
          Forgot your password?
        </button>

        <Show when={message()}>
          <p class={styles.message}>{message()}</p>
        </Show>

        <div class={styles.actions}>
          <button class="action" type="submit">
            login
          </button>

          <button class="action" type="button">
            create account
          </button>
        </div>
      </form>
    </section>
  );
};
