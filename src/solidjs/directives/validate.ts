import type { Accessor } from "solid-js";

export const validate = (
  el: HTMLInputElement,
  handleEvent: Accessor<(error: boolean, message: string) => void>,
) => {
  el.addEventListener("blur", function () {
    let message = "";

    if (this.validity.valueMissing) {
      message = `${this.name} is required`;
    } else if (this.validity.patternMismatch) {
      message = `${this.name} has invalid value`;
    } else if (this.validity.typeMismatch) {
      message = `${this.name} has invalid ${this.type} type`;
    } else if (
      this.name === "repeat" &&
      this.value !==
        (this.form?.elements?.namedItem("password") as HTMLInputElement).value
    ) {
      message = `password doesn't match`;
    }

    this.setCustomValidity(message);

    handleEvent()(this.validity.customError, this.validationMessage);
  });
};
