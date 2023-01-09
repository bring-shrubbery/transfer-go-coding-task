import { useMutation } from "react-query";
import type { FxRatesModelType } from "../validation/api";
import { API_ROUTES } from "../routes";

export const useFxRatesMutation = (opts: FxRatesModelType) =>
	useMutation(["fxRates", opts], async () =>
		(await fetch(API_ROUTES.fxRates(opts))).json(),
	);
