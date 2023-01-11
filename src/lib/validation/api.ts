import { z } from "zod";

export const CurrencyModel = z
  .string()
  .length(3, "Should be valid 3 letter currency code");

export const FxRatesModel = z.object({
  from: CurrencyModel,
  to: CurrencyModel,
  amount: z.number().positive(),
  convertedTo: z.number().positive().optional().nullish(),
});
export type FxRatesModelType = z.infer<typeof FxRatesModel>;

export const FxRatesResultModel = z.object({
  from: CurrencyModel,
  to: CurrencyModel,
  rate: z.number(),
  fromAmount: z.number(),
  toAmount: z.number(),
});
export type FxRatesResultModelType = z.infer<typeof FxRatesResultModel>;
