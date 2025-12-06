import type { Accessor } from "solid-js";

export const validate = (
  el: HTMLInputElement,
  data: Accessor<{
    callback: (error: boolean, message: string) => void;
    patternMessage?: string;
    requiredMessage?: string;
  }>,
) => {
  el.addEventListener("blur", function () {
    const { callback, patternMessage, requiredMessage } = data();

    let message = "";

    if (this.validity.valueMissing) {
      message = requiredMessage ?? `${this.name} is required`;
    } else if (this.validity.patternMismatch) {
      message = patternMessage ?? `${this.name} has invalid value`;
    } else if (
      this.name === "repeat" &&
      this.value !==
        (this.form?.elements?.namedItem("password") as HTMLInputElement).value
    ) {
      message = `password doesn't match`;
    }

    this.setCustomValidity(message);

    callback(this.validity.customError, this.validationMessage);
  });
};
