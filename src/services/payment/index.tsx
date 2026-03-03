import { apiPublic } from "../../config/api/apiPublic/apiPublic";


export type TipoInscricao = "PARTICIPANTE" | "SERVO";

interface ValoresResponse {
    priceParticipante: number;
    priceServo: number;
}

export const paymentService = {
    async buscarValores(): Promise<ValoresResponse> {
        const response = await apiPublic.get("/api/valor-incricao");
        return response.data;
    },

    async criarPagamento(tipo: TipoInscricao, valor: number) {
        const response = await apiPublic.post("/api/payments/pagamento", {
            tipo,
            valor,
        });

        return response.data;
    },
};