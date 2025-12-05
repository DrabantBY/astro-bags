import type { AuthTypes } from "./types";

import { createSignal } from "solid-js";
import { Dynamic } from "solid-js/web";

import {
  LoginForm,
  ResetForm,
  ConfirmForm,
  SignupForm,
  ActivateForm,
} from "./forms";

import { AuthShell } from "./shells";

const FORM_LIST: AuthTypes.FormList = {
  LOGIN: LoginForm,
  RESET: ResetForm,
  SIGNUP: SignupForm,
  CONFIRM: ConfirmForm,
  ACTIVATE: ActivateForm,
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
    title: "Create an account",
    text: "Please complete the fields below. Enter the activation code from your email.",
  },
  //TODO move to page
  CONFIRM: {
    title: "Reset your password",
    text: "Your password must contain at least 8 characters without spaces with letters, at least one number, one capital letter, and one special character.",
  },

  ACTIVATE: {
    title: "Account activation",
    text: "Please enter the activation code you just received by email",
  },
} as const;

export const AuthPage = () => {
  const [formName, setFormName] = createSignal<AuthTypes.FormName>("LOGIN");

  return (
    <AuthShell {...FORM_TITLES[formName()]}>
      <Dynamic component={FORM_LIST[formName()]} setFormName={setFormName} />
    </AuthShell>
  );
};
