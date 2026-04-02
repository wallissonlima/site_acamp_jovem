import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";
import { PayButton, PaymentContainer, WalletBox } from "./styles";
import { CreditCard } from "phosphor-react";
import { paymentService } from "../../../services/payment";
import type { TipoInscricao } from "../../../services/payment/inscricaoStatusService";

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

  /**
   * Busca o valor da inscrição (servo ou participante)
   */
  useEffect(() => {
    async function carregarValores() {
      try {
        const response = await paymentService.buscarValores();

        const price =
          tipo === "SERVO"
            ? response.priceServo
            : response.priceParticipante;

        setValor(Number(price));
      } catch (error: any) {
        console.error("Erro ao buscar valores:", error);
        console.error("STATUS buscarValores:", error?.response?.status);
        console.error("DATA buscarValores:", error?.response?.data);
      }
    }

    carregarValores();
  }, [tipo]);

  /**
   * Cria o pagamento no backend e inicializa o checkout
   */
  async function handleBuy() {
    try {
      setLoading(true);

      const pagamento = await paymentService.criarPagamento(inscricaoId);

      if (!pagamento?.preferenceId) {
        throw new Error("preferenceId não retornado pelo backend");
      }

      // ✅ NÃO salvamos mais nada no localStorage
      // Fluxo agora é totalmente baseado no redirect do Mercado Pago

      setPreferenceId(pagamento.preferenceId);
    } catch (error: any) {
      console.error("Erro ao criar pagamento:", error);
      console.error("STATUS:", error?.response?.status);
      console.error("DATA:", error?.response?.data);
      console.error("MESSAGE:", error?.response?.data?.message);
      console.error("INSCRICAO ID ENVIADO:", inscricaoId);
      console.error("TIPO:", tipo);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Fallback caso o valor não carregue
   */
  if (valor === null) {
    return (
      <PaymentContainer>
        <PayButton onClick={handleBuy} disabled={loading}>
          <CreditCard size={20} />
          {loading ? "Gerando pagamento..." : "Pagar inscrição"}
        </PayButton>

        {preferenceId && (
          <WalletBox>
            <Wallet initialization={{ preferenceId }} />
          </WalletBox>
        )}
      </PaymentContainer>
    );
  }

  /**
   * Fluxo normal com valor exibido
   */
  return (
    <PaymentContainer>
      <PayButton onClick={handleBuy} disabled={loading}>
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