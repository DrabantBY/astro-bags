import type { JSX, Setter } from "solid-js";

export namespace AuthTypes {
  //TODO remove CONFIRM
  type FormName = "LOGIN" | "RESET" | "SIGNUP" | "CONFIRM" | "ACTIVATE";

  type FormProps = {
    setFormName: Setter<FormName>;
  };

  type FormList = Record<FormName, (props: FormProps) => JSX.Element>;
}
