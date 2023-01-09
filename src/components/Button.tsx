import { ComponentProps, forwardRef } from "react";
import cx from "classnames";

import styles from "./Button.module.scss";

export type ButtonVariant = "primary";
export type ButtonRounded = 0 | 1 | 2 | 4 | 8;

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  rounded?: ButtonRounded;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: styles.primary,
};

const ROUNDED_CLASSES: Record<ButtonRounded, string> = {
  0: styles["button-radius-0"],
  1: styles["button-radius-1"],
  2: styles["button-radius-2"],
  4: styles["button-radius-4"],
  8: styles["button-radius-8"],
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, variant = "primary", rounded = 0, ...props },
    ref
  ) => {
    return (
      <button
        className={cx(
          styles.button,
          className,
          VARIANT_CLASSES[variant],
          ROUNDED_CLASSES[rounded]
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
