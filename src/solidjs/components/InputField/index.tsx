import type { FormTypes } from "@solidjs/types";

import { createUniqueId, Show } from "solid-js";
import { createStore, produce } from "solid-js/store";

import styles from "./styles.module.css";

export const InputField = (props: FormTypes.FieldProps) => {
  const id = createUniqueId();

  const [fieldStore, setFieldStore] = createStore<FormTypes.FieldStore>({
    type: props.type ?? "text",
    error: false,
    errorMessage: "",
  });

  const onBlur = (e: FormTypes.FieldEvent) => {
    setFieldStore(
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
        type={fieldStore.type}
        inputMode={props.inputMode ?? "text"}
        name={props.name}
        value={props.value ?? ""}
        onChange={props.onChange}
        onBlur={onBlur}
        onInput={props.onInput}
        required={props.required}
        placeholder={props.placeholder ?? ""}
      />

      <Show when={fieldStore.error}>
        <span class={styles.error}>{fieldStore.errorMessage}</span>
      </Show>

      <Show when={props.type === "password"}>
        <button
          type="button"
          classList={{
            "icon-show": fieldStore.type === "password",
            "icon-hide": fieldStore.type === "text",
          }}
          onClick={() => {
            setFieldStore(
              produce((store) => {
                store.type = store.type === "password" ? "text" : "password";
              }),
            );
          }}
        />
      </Show>
    </div>
  );
};
