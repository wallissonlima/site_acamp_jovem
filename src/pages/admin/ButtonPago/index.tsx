import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";
import { PayButton, PaymentContainer, WalletBox } from "./styles";
import { CreditCard } from "phosphor-react";
import { paymentService, type TipoInscricao } from "../../../services/payment";

initMercadoPago(import.meta.env.VITE_APP_MP_PUBLIC_KEY);

interface Props {
  tipo: TipoInscricao;
  inscricaoId: number;
}

const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export function MercadoPagoButton({ tipo, inscricaoId }: Props) {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [valor, setValor] = useState<number | null>(null);

  useEffect(() => {
    async function carregarValores() {
      try {
        const response = await paymentService.buscarValores();

        setValor(
          tipo === "SERVO"
            ? response.priceServo
            : response.priceParticipante
        );
      } catch (error) {
        console.error("Erro ao buscar valores:", error);
      }
    }

    carregarValores();
  }, [tipo]);

  async function handleBuy() {
    try {
      setLoading(true);

      const response = await paymentService.criarPagamento(tipo, inscricaoId);

      setPreferenceId(response.preferenceId);
    } catch (error) {
      console.error("Erro ao criar pagamento:", error);
    } finally {
      setLoading(false);
    }
  }

  if (valor === null) {
    return <p>Carregando valor...</p>;
  }

  return (
    <PaymentContainer>
      <PayButton onClick={handleBuy} loading={loading}>
        <CreditCard size={20} />

        {loading
          ? "Gerando pagamento..."
          : tipo === "SERVO"
            ? `Pagar inscrição de Servo — ${formatBRL(valor)}`
            : `Pagar inscrição de Participante — ${formatBRL(valor)}`}
      </PayButton>

      {preferenceId && (
        <WalletBox>
          <Wallet initialization={{ preferenceId }} />
        </WalletBox>
      )}
    </PaymentContainer>
  );
}