import { PropsWithChildren } from "react";

import styles from "./Container.module.scss";

export interface ContainerProps {}

export const Container = ({ children }: PropsWithChildren<ContainerProps>) => {
	return <div className={styles.container}>{children}</div>;
};
