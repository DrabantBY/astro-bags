import type { JSX, Setter } from "solid-js";

export namespace FormTypes {
  type FieldMode =
    | "search"
    | "text"
    | "url"
    | "none"
    | "email"
    | "tel"
    | "numeric"
    | "decimal";

  type FieldStore = {
    type: string;
    error: boolean;
    errorMessage: string | undefined;
  };

  type FieldProps = {
    type?: string;
    inputMode?: FieldMode;
    name?: string;
    label?: string;
    value?: string;
    placeholder?: string;
    onChange?: () => void;
    onInput?: () => void;
    pattern?: string;
    required?: boolean;
  };
  //TODO remove CONFIRM
  type FormName = "LOGIN" | "RESET" | "SIGNUP" | "CONFIRM";

  type FormProps = {
    setFormName: Setter<FormName>;
  };

  type FormList = Record<FormName, (props: FormProps) => JSX.Element>;

  type FieldEvent = Event & {
    currentTarget: HTMLInputElement;
    target: HTMLInputElement;
  };

  type FormEvent = SubmitEvent & {
    currentTarget: HTMLFormElement;
    target: Element;
  };
}
