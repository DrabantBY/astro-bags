import type { FormTypes } from "@solidjs/types";

import { createStore, produce } from "solid-js/store";

import { createSelector, createUniqueId } from "solid-js";

export const useInputFieldStore = (type: string = "text") => {
  const id = createUniqueId();

  const [fieldStore, setFieldStore] = createStore<FormTypes.FieldStore>({
    type,
    error: false,
    errorMessage: "",
  });

  const hasType = createSelector(() => fieldStore.type);

  const onBlurValidate = (error: boolean, message: string) => {
    setFieldStore(
      produce((store) => {
        store.error = error;
        store.errorMessage = message;
      }),
    );
  };

  const onClickToggle = () => {
    setFieldStore(
      produce((store) => {
        store.type = store.type === "password" ? "text" : "password";
      }),
    );
  };

  return {
    id,
    hasType,
    fieldStore,
    setFieldStore,
    onBlurValidate,
    onClickToggle,
  };
};
