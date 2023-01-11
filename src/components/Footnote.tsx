import { PropsWithChildren } from "react";

import styles from "./Footnote.module.scss";

export const Footnote = ({ children }: PropsWithChildren) => {
  return <span className={styles.footnote}>{children}</span>;
};
