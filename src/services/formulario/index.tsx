import api from "../../config/api";
import type { iFormularioProps } from "../../interfaces/iFomulario";


export const formularioService = {
    async criarInscricao(data: iFormularioProps) {
        // 🔎 verifica CPF
        const check = await api.get(`/api/formulario/exists-cpf/${data.cpf}`);

        if (check.data.exists) {
            throw new Error("Este CPF já está cadastrado!");
        }

        // 🚀 cria inscrição
        await api.post("/api/formulario", data);
    },
};
