import { Footnote } from "./Footnote";
import styles from "./RateInfo.module.scss";
import { Stack } from "./Stack";

interface RateInfoProps {
  rate: number;
  from: string;
  to: string;
}

export const RateInfo = ({ rate, from, to }: RateInfoProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.rate}>
        <div className={styles.fakeRadio} />
        <span>
          1 {from} = {rate.toFixed(5)} {to}
        </span>
      </div>
      <Footnote>
        All figures are live mid-market rates, which are for informational
        purposes only. To see the rates for money transfer, please select
        sending money option.
      </Footnote>
    </div>
  );
};
