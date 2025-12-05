declare module "solid-js" {
  namespace JSX {
    interface Directives {
      validate: (error: boolean, message: string) => void;
    }
  }
}

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

  type FieldEvent = Event & {
    currentTarget: HTMLInputElement;
    target: HTMLInputElement;
  };

  type FormEvent = SubmitEvent & {
    currentTarget: HTMLFormElement;
    target: Element;
  };
}
