import { PropsWithChildren } from "react";

import styles from "./Paper.module.scss";

export const Paper = ({ children }: PropsWithChildren) => {
	return <div className={styles.paper}>{children}</div>;
};
