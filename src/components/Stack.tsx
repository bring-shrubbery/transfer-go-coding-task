import { ComponentProps, PropsWithChildren, createElement } from "react";

import styles from "./Stack.module.scss";

type HTMLTags = keyof HTMLElementTagNameMap;

interface StackProps<T extends HTMLTags> {
  as?: T;
  dir?: "column" | "row";
  spacing?: string;
  width?: string;
}

export const Stack = <T extends HTMLTags>({
  as,
  spacing,
  dir = "column",
  width = "100%",
  children,
  ...props
}: PropsWithChildren<StackProps<T> & ComponentProps<T>>) => {
  return createElement(
    as || "div",
    {
      className: styles.stack,
      style: {
        "--stack-gap": spacing,
        "--stack-dir": dir,
        "--stack-width": width,
      },
      ...props,
    },
    children
  );
};
