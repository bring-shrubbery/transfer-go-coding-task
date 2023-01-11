import * as Label from "@radix-ui/react-label";
import { Children, PropsWithoutRef, ReactElement } from "react";

import styles from "./BadLabel.module.scss";

export interface BadLabelProps {
  label: string;
  children: ReactElement;
}

export const BadLabel = ({
  label,
  children,
}: PropsWithoutRef<BadLabelProps>) => {
  const child = Children.only(children);

  const id = child?.props?.id as string | undefined; // TODO: eeeh
  // TODO: throw error if child doesn't provide id, or provide id automatically

  return (
    <div className={styles.container}>
      <Label.Root className={styles.label} htmlFor={id}>
        {label}
      </Label.Root>
      {child}
    </div>
  );
};
