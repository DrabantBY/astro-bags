import type { FormTypes } from "@solidjs/types";

import { createUniqueId, Show } from "solid-js";
import { createStore, produce } from "solid-js/store";

import styles from "./styles.module.css";

export const InputField = (props: FormTypes.FieldProps) => {
  const id = createUniqueId();

  const [errorStore, setErrorStore] = createStore<FormTypes.FieldError>({
    error: false,
    errorMessage: "",
  });

  const onBlur = (e: FormTypes.FieldEvent) => {
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
