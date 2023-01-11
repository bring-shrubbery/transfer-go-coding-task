import { HiArrowsRightLeft } from "react-icons/hi2";

import styles from "./SwapButton.module.scss";

interface SwapButtonProps {
  onClick: () => void;
}

export const SwapButton = ({ onClick }: SwapButtonProps) => {
  return (
    <div onClick={onClick} className={styles.btn}>
      <HiArrowsRightLeft size="22" color="var(--color-sky-500)" />
    </div>
  );
};
