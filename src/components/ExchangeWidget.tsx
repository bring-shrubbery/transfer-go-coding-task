import { Paper } from "./Paper";
import { ExchangeForm } from "./ExchangeForm";
import { useFxRatesMutation } from "../lib/queries/api";
import { FxRatesModelType } from "../lib/validation/api";

interface ExchangeWidgetProps {}

export const ExchangeWidget = (props: ExchangeWidgetProps) => {
	const fxRatesMutation = useFxRatesMutation({
		from: "EUR",
		to: "GBP",
		amount: 1,
	});

	const handleOnConvert = async (data: FxRatesModelType) => {
		const result = fxRatesMutation.mutate();

		console.log(result);
	};

	return (
		<Paper>
			<ExchangeForm onSubmit={handleOnConvert} />
		</Paper>
	);
};
