import { createUniqueId, Show } from "solid-js";
import { createStore, produce } from "solid-js/store";

import styles from "./styles.module.css";

type InputMode =
  | "search"
  | "text"
  | "url"
  | "none"
  | "email"
  | "tel"
  | "numeric"
  | "decimal";

type InputFieldProps = {
  type?: string;
  inputMode?: InputMode;
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: () => void;
  onInput?: () => void;
  pattern?: string;
  required?: boolean;
};

type InputFieldEvent = Event & {
  currentTarget: HTMLInputElement;
  target: HTMLInputElement;
};

type InputFieldError = {
  error: boolean;
  errorMessage: string | undefined;
};

export const InputField = (props: InputFieldProps) => {
  const id = createUniqueId();

  const [errorStore, setErrorStore] = createStore<InputFieldError>({
    error: false,
    errorMessage: "",
  });

  const onBlur = (e: InputFieldEvent) => {
    setErrorStore(
      produce((store) => {
        store.error = !e.target.validity.valid;
        store.errorMessage = e.target.validationMessage;
      }),
    );
  };

  return (
    <div class={styles.field}>
      <label class={styles.label} for={id}>
        {props.label}
      </label>
      <input
        class={styles.input}
        id={id}
        type={props.type ?? "text"}
        inputMode={props.inputMode ?? "text"}
        name={props.name}
        value={props.value ?? ""}
        onChange={props.onChange}
        onBlur={onBlur}
        onInput={props.onInput}
        required={props.required}
        placeholder={props.placeholder ?? ""}
      />
      <Show when={errorStore.error}>
        <span class={styles.error}>{errorStore.errorMessage}</span>
      </Show>
    </div>
  );
};
