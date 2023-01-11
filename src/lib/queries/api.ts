import { useMutation } from "react-query";
import { FxRatesModelType, FxRatesResultModel } from "../validation/api";
import { API_ROUTES } from "../routes";

export const useFxRatesMutation = () =>
  useMutation(["fxRates"], async (opts: FxRatesModelType) => {
    const res = await fetch(API_ROUTES.fxRates(opts));
    const json = await res.json();
    return FxRatesResultModel.parse(json);
  });
