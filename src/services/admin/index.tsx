import api from "../../config/api";


interface StatusResponse {
    limiteParticipantes: number;
    limiteServos: number;
    totalParticipantes: number;
    totalServos: number;
    ativo: boolean;
}

interface ValoresResponse {
    priceParticipante: number;
    priceServo: number;
}

export const adminService = {
    // 🔹 Buscar status e limites
    async buscarStatus(): Promise<StatusResponse> {
        const response = await api.get("/api/limite-inscricao/status");
        return response.data;
    },

    // 🔹 Buscar valores
    async buscarValores(): Promise<ValoresResponse> {
        const response = await api.get("/api/valor-incricao");
        return response.data;
    },

    // 🔹 Salvar limites
    async salvarLimites(data: {
        limiteParticipantes: number;
        limiteServos: number;
        ativo: boolean;
    }) {
        await api.put("/api/limite-inscricao", data);
    },

    // 🔹 Salvar valores
    async salvarValores(data: {
        priceParticipante: number;
        priceServo: number;
    }) {
        await api.put("/api/valor-incricao", data);
    },
};