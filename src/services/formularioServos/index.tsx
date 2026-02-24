import api from "../../config/api";
import type { iFormularioServoProps } from "../../interfaces/iFormularioServos";

export const formularioServosService = {
    async criarInscricao(data: iFormularioServoProps) {
        // 🔎 verifica CPF
        const check = await api.get(
            `/api/formularioServos/exists-cpf/${data.cpf}`
        );

        if (check.data.exists) {
            throw new Error("Este CPF já está cadastrado!");
        }

        // 🚀 cria inscrição
        await api.post("/api/formularioServos", {
            tipo: "SERVO",
            ...data,
        });
    },
};