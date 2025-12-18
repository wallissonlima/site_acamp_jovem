import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PayButton, PaymentContainer, WalletBox } from './styles';
import { CreditCard } from 'phosphor-react';

// 🔹 Inicializa UMA VEZ
initMercadoPago("APP_USR-67af6af5-f13d-41c3-b52b-857e5112c17d");

type TipoInscricao = 'PARTICIPANTE' | 'SERVO';

interface Props {
    tipo: TipoInscricao;
}

interface ValoresResponse {
    priceParticipante: number;
    priceServo: number;
}

const formatBRL = (value: number) =>
    value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

export function MercadoPagoButton({ tipo }: Props) {
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [valor, setValor] = useState<number | null>(null);

    // 🔹 Buscar valores ao carregar
    useEffect(() => {
        async function carregarValores() {
            const response = await axios.get<ValoresResponse>(
                "http://localhost:3000/api/valor-incricao"
            );

            setValor(
                tipo === 'SERVO'
                    ? response.data.priceServo
                    : response.data.priceParticipante
            );
        }

        carregarValores();
    }, [tipo]);

    async function handleBuy() {
        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:3000/api/payments/pagamento",
                {
                    tipo,
                    valor, // 👈 envia o valor correto
                }
            );

            setPreferenceId(response.data.preferenceId);
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
