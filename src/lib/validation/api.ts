import { z } from "zod";

export const CurrencyModel = z
	.string()
	.length(3, "Should be valid 3 letter currency code");

export const FxRatesModel = z.object({
	from: CurrencyModel,
	to: CurrencyModel,
	amount: z.number(),
});

export type FxRatesModelType = z.infer<typeof FxRatesModel>;
