import { apiPublic } from "../../config/api/apiPublic/apiPublic";

interface ValoresResponse {
  priceParticipante: number;
  priceServo: number;
}

interface CriarPagamentoResponse {
  preferenceId: string;
  init_point: string;
  sandbox_init_point?: string;
  tipo: "PARTICIPANTE" | "SERVO";
  inscricaoId: number;
  valor: number;
}

export const paymentService = {
  async buscarValores(): Promise<ValoresResponse> {
    const response = await apiPublic.get("/api/valor-inscricao");
    return response.data;
  },

  async criarPagamento(inscricaoId: number): Promise<CriarPagamentoResponse> {
    try {

      const response = await apiPublic.post("/api/payments/pagamento", {
        inscricaoId,
      });

      return response.data;
    } catch (error: any) {
      console.error("ERRO criarPagamento:", error);
      console.error("STATUS criarPagamento:", error?.response?.status);
      console.error("DATA criarPagamento:", error?.response?.data);
      console.error("MESSAGE criarPagamento:", error?.response?.data?.message);
      throw error;
    }
  },
};