import { apiPublic } from "../../config/api/apiPublic/apiPublic";

export type TipoInscricao = "PARTICIPANTE" | "SERVO";

export type StatusPagamento =
  | "EM_PROCESSAMENTO"
  | "APROVADO"
  | "NAO_APROVADO";

export interface InscricaoStatusResponse {
  id: number;
  name: string;
  email: string;
  statusPagamento: StatusPagamento;
}

export const inscricaoStatusService = {
  async buscarInscricao(
    tipo: TipoInscricao,
    inscricaoId: number | string
  ): Promise<InscricaoStatusResponse> {
    const rota =
      tipo === "SERVO"
        ? `/api/formularioServos/${inscricaoId}`
        : `/api/formulario/${inscricaoId}`;

    const response = await apiPublic.get(rota);

    console.log("RETORNO buscarInscricao:", response.data);

    return response.data as InscricaoStatusResponse;
  },
};