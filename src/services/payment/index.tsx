import { apiPublic } from "../../config/api/apiPublic/apiPublic";

interface ValoresResponse {
  priceParticipante: number;
  priceServo: number;
}

export const paymentService = {
  async buscarValores(): Promise<ValoresResponse> {
    const response = await apiPublic.get("/api/valor-inscricao");
    return response.data;
  },

  async criarPagamento(inscricaoId: number) {
    const response = await apiPublic.post("/api/payments/pagamento", {
      inscricaoId,
    });

    return response.data;
  },
};