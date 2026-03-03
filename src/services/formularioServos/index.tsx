
import { apiPublic } from "../../config/api/apiPublic/apiPublic";
import type { iFormularioServoProps } from "../../interfaces/iFormularioServos";

export const formularioServosService = {
    async criarInscricao(data: iFormularioServoProps) {
        // 🔎 verifica CPF
        const check = await apiPublic.get(
            `/api/formularioServos/exists-cpf/${data.cpf}`
        );

        if (check.data.exists) {
            throw new Error("Este CPF já está cadastrado!");
        }

        // 🚀 cria inscrição
        await apiPublic.post("/api/formularioServos", {
            tipo: "SERVO",
            ...data,
        });
    },
};