import type { JSX } from "solid-js";

import styles from "@solidjs/styles.module.css";

type AuthShellProps = {
  title: string;
  text: string;
  children: JSX.Element;
};

export const AuthShell = (props: AuthShellProps) => {
  return (
    <section class={styles.shell}>
      <figure class={styles.figure}>
        <img src="/monogram.png" alt="monogram picture" />
      </figure>

      <h2 class={styles.title}>{props.title}</h2>

      <p class={styles.text}>{props.text}</p>

      {props.children}
    </section>
  );
};
