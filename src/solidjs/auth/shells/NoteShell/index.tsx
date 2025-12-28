import styles from "./styles.module.css";

type NoteShellProps = {
  note: string;
};

export const NoteShell = (props: NoteShellProps) => {
  return (
    <section class={styles.noteSection}>
      <div class="__container">
        <h2 class={styles.noteTitle}>{props.note}</h2>
      </div>
    </section>
  );
};
