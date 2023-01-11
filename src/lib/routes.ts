import qs from "query-string";
import { FxRatesModelType } from "./validation/api.js";
import { env } from "./env/server.mjs";

export const API_ROUTES = {
  fxRates: (opts: FxRatesModelType) =>
    env.NEXT_PUBLIC_API_HOST.replace(/\/$/, "") +
    `/api/fx-rates?${qs.stringify(opts)}`,
};
