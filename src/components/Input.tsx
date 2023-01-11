import { ComponentProps, forwardRef } from "react";
import cx from "classnames";

import styles from "./Input.module.scss";

export interface InputProps extends ComponentProps<"input"> {
  suffix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, suffix, style, ...props }, ref) => {
    return (
      <div className={styles.container}>
        <input
          className={cx(styles.input, className)}
          style={{
            // @ts-ignore
            "--input-suffix": suffix,
            ...style,
          }}
          {...props}
          ref={ref}
        />
        {suffix && <div className={styles.suffix}>{suffix}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";
