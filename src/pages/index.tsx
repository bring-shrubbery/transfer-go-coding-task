import { Container } from "../components/Container";
import { ExchangeWidget } from "../components/ExchangeWidget";

export default function Home() {
  return (
    <Container>
      <div style={{ height: "50px" }} /> {/* Spacer for clarity */}
      <ExchangeWidget />
    </Container>
  );
}
