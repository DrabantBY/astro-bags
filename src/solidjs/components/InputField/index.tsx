import type { FormTypes } from "@solidjs/types";

import { Show } from "solid-js";

import { useInputFieldStore } from "@solidjs/hooks";

import { validate } from "@solidjs/directives";

import styles from "./styles.module.css";

export const InputField = (props: FormTypes.FieldProps) => {
  const { id, hasType, fieldStore, onBlurValidate, onClickToggle } =
    useInputFieldStore(props.type);

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
        onInput={props.onInput}
        required={props.required}
        pattern={props.pattern}
        placeholder={props.placeholder ?? ""}
        use:validate={{
          callback: onBlurValidate,
          patternMessage: props.patternErrorMessage,
          requiredMessage: props.requiredErrorMessage,
        }}
      />

      <Show when={fieldStore.error}>
        <span class={styles.error}>{fieldStore.errorMessage}</span>
      </Show>

      <Show when={props.type === "password"}>
        <button
          type="button"
          classList={{
            "icon-show": hasType("password"),
            "icon-hide": hasType("text"),
          }}
          onClick={onClickToggle}
        />
      </Show>
    </div>
  );
};
