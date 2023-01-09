import { ComponentProps, PropsWithChildren, createElement } from "react";

import styles from "./HStack.module.scss";

type HTMLTags = keyof HTMLElementTagNameMap;

interface HStackProps<T extends HTMLTags> {
  as?: T;
  spacing?: string;
}

export const HStack = <T extends HTMLTags>({
  as,
  spacing,
  children,
}: PropsWithChildren<HStackProps<T> & ComponentProps<T>>) => {
  return createElement(
    as || "div",
    {
      className: styles.hstack,
      style: { "--stack-gap": spacing },
    },
    children
  );
};
