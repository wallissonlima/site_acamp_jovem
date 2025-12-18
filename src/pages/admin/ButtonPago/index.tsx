import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
        <div>
            <button onClick={handleBuy} disabled={loading}>
                {loading
                    ? "Gerando pagamento..."
                    : tipo === "SERVO"
                        ? `Pagar inscrição de Servo — R$ ${valor}`
                        : `Pagar inscrição de Participante — R$ ${valor}`}
            </button>

            {preferenceId && (
                <Wallet initialization={{ preferenceId }} />
            )}
        </div>
    );
}
