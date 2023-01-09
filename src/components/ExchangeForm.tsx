import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FxRatesModel, FxRatesModelType } from "../lib/validation/api";
import { Input } from "./Input";
import { Button } from "./Button";
import { HStack } from "./HStack";

export interface ExchangeFormProps {
  onSubmit: (data: FxRatesModelType) => void;
}

export const ExchangeForm = (props: ExchangeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FxRatesModelType>({
    resolver: zodResolver(FxRatesModel),
    defaultValues: {
      from: "EUR",
      to: "GBP",
    },
  });

  return (
    <HStack
      as="form"
      spacing="24px"
      className="flex flex-col"
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <input {...register("from")} />
      <input {...register("to")} />
      <Input {...register("amount")} />

      <Button type="submit">Convert</Button>
    </HStack>
  );
};
