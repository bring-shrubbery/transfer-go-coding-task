import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FxRatesModel, FxRatesModelType } from "../lib/validation/api";
import { Input } from "./Input";
import { Button } from "./Button";
import { Stack } from "./Stack";
import { ListSelect } from "./ListSelect";

// @ts-ignore reason:no types in this package
import { getEmojiByCurrencyCode } from "country-currency-emoji-flags";

import currencies from "../data/currencies.json";
import { BadLabel } from "./BadLabel";
import { SwapButton } from "./SwapButton";
import { useFxRatesMutation } from "../lib/queries/api";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { RateInfo } from "./RateInfo";
import { NumericFormat } from "react-number-format";

export interface ExchangeFormProps {}

const currencyListSelectItems = currencies.map((key) => {
  return {
    label: key,
    prefix: getEmojiByCurrencyCode(key) || "🏴‍☠️",
    value: key,
  };
});

export const ExchangeForm = (props: ExchangeFormProps) => {
  const [initialSubmitDone, setInitialSubmitDone] = useState(false);
  const [rate, setRate] = useState<number>();
  const fxRatesMutation = useFxRatesMutation();

  const { register, handleSubmit, watch, setValue } = useForm<FxRatesModelType>(
    {
      resolver: zodResolver(FxRatesModel),
      defaultValues: {
        from: "EUR",
        to: "GBP",
        amount: 1,
      },
    }
  );

  const formValues = watch();

  const handleSwitchCurrencies = () => {
    const prevValues = { ...formValues };
    setValue("to", prevValues.from);
    setValue("from", prevValues.to);
    if (initialSubmitDone && prevValues.convertedTo) {
      setValue("amount", prevValues.convertedTo);
      setValue("convertedTo", prevValues.amount);
    }
    if (rate) setRate(1 / rate);
  };

  // TODO: Ideally this would stay in ExchangeWidget component

  const handleInitialSubmit = async (data: FxRatesModelType) => {
    const res = await fxRatesMutation.mutateAsync(data);
    setValue("convertedTo", res.toAmount);
    setInitialSubmitDone(true);
    setRate(res.rate);
  };

  const handleConvertedToChange = useDebouncedCallback(
    async (value: number) => {
      const res = await fxRatesMutation.mutateAsync({
        from: formValues.to,
        to: formValues.from,
        amount: value,
      });
      setValue("amount", res.toAmount);
      setRate(1 / res.rate);
    },
    200
  );

  const handleAmountChange = useDebouncedCallback((value: number) => {
    handleInitialSubmit({
      from: formValues.from,
      to: formValues.to,
      amount: value,
    });
  }, 200);

  return (
    <Stack
      as="form"
      spacing="24px"
      onSubmit={handleSubmit(handleInitialSubmit)}
    >
      <Stack dir="row">
        <BadLabel label="from:">
          <ListSelect
            id="from-select"
            items={currencyListSelectItems}
            value={formValues.from}
            onValueChange={(value) => setValue("from", value)}
          />
        </BadLabel>

        <SwapButton onClick={handleSwitchCurrencies} />

        <BadLabel label="to:">
          <ListSelect
            id="to-select"
            items={currencyListSelectItems}
            value={formValues.to}
            onValueChange={(value) => setValue("to", value)}
          />
        </BadLabel>
      </Stack>

      <Stack dir="row">
        <BadLabel label="amount:">
          <NumericFormat
            id="amount-input"
            decimalScale={2}
            fixedDecimalScale
            customSuffix={formValues.from}
            value={formValues.amount}
            onChange={(e) => {
              const value = !e.target.value ? null : Number(e.target.value);
              if (value && initialSubmitDone) {
                handleAmountChange(value);
              }
            }}
            customInput={Input}
          />
        </BadLabel>

        {initialSubmitDone && (
          <BadLabel label="converted to:">
            <NumericFormat
              id="converted-to-input"
              customSuffix={formValues.to}
              customInput={Input}
              decimalScale={2}
              fixedDecimalScale
              value={formValues.convertedTo ?? ""}
              onValueChange={(values) => {
                // const value = !e.target.value ? null : Number(e.target.value);
                setValue("convertedTo", values.floatValue);

                if (values.floatValue) {
                  handleConvertedToChange(values.floatValue);
                }
              }}
            />
          </BadLabel>
        )}
      </Stack>

      <div style={{ height: "var(--size-8)" }} />

      {initialSubmitDone && rate && (
        <RateInfo rate={rate} from={formValues.from} to={formValues.to} />
      )}

      {!initialSubmitDone && <Button type="submit">Convert</Button>}
    </Stack>
  );
};
