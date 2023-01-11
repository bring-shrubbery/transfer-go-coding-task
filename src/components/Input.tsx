import { ComponentProps, forwardRef } from "react";
import cx from "classnames";

import styles from "./Input.module.scss";

export interface InputProps extends ComponentProps<"input"> {
  customSuffix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, customSuffix, ...props }, ref) => {
    return (
      <div className={styles.container}>
        <input className={cx(styles.input, className)} {...props} ref={ref} />
        {customSuffix && <div className={styles.suffix}>{customSuffix}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";
