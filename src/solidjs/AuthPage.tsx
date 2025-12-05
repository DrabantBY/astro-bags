import type { FormTypes } from "@solidjs/types";

import { createSignal } from "solid-js";
import { Dynamic } from "solid-js/web";

import { AuthShell } from "@solidjs/shells";
import { LoginForm, ResetForm, ConfirmForm } from "@solidjs/forms";

const FORM_LIST: FormTypes.FormList = {
  LOGIN: LoginForm,
  RESET: ResetForm,
  SIGNUP: ConfirmForm,
  CONFIRM: ConfirmForm,
};

const FORM_TITLES = {
  LOGIN: {
    title: "I already have an account",
    text: "If you already have an account, please enter your email and password.",
  },

  RESET: {
    title: "Reset your password",
    text: "Please enter the email address you registered with. We will send you a link for changing your password.",
  },

  SIGNUP: {
    title: "Reset your password",
    text: "Your password must contain at least 8 characters without spaces with letters, at least one number, one capital letter, and one special character.",
  },
  //TODO move to page
  CONFIRM: {
    title: "Reset your password",
    text: "Your password must contain at least 8 characters without spaces with letters, at least one number, one capital letter, and one special character.",
  },
};

export const AuthPage = () => {
  const [formName, setFormName] = createSignal<FormTypes.FormName>("LOGIN");

  return (
    <AuthShell {...FORM_TITLES[formName()]}>
      <Dynamic component={FORM_LIST[formName()]} setFormName={setFormName} />
    </AuthShell>
  );
};
