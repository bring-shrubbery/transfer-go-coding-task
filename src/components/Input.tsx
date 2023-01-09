import { ComponentProps, forwardRef } from "react";
import cx from "classnames";

import styles from "./Input.module.scss";

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
	({ className, ...props }, ref) => {
		return (
			<input
				className={cx(
					styles.input,
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);

Input.displayName = "Input";
