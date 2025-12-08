import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
import { useState } from 'react';

// Inicializa UMA VEZ só
initMercadoPago("APP_USR-67af6af5-f13d-41c3-b52b-857e5112c17d");

export function MercadoPagoButton() {
    const [preferenceId, setPreferenceId] = useState(null);

    async function handleBuy() {
        try {
            const response = await axios.post("http://localhost:3000/api/payments/create", {
                title: "Inscrição Acampa Jovem",
                price: 120.00,
            });

            setPreferenceId(response.data.preferenceId);
        } catch (error) {
            console.error("Erro ao criar pagamento:", error);
        }
    }

    return (
        <div>
            {/* ÚNICO BOTÃO VISÍVEL */}
            <button onClick={handleBuy} className="btn btn-primary">
                Pagar com Mercado Pago
            </button>

            {/* Renderiza o checkout apenas quando existir um preferenceId */}
            {preferenceId && (
                <Wallet initialization={{ preferenceId }} />
            )}
        </div>
    );
}
