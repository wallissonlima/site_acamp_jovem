
import { apiPublic } from "../../config/api/apiPublic/apiPublic";
import type { iFormularioProps } from "../../interfaces/iFomulario";


export const formularioService = {
    async criarInscricao(data: iFormularioProps) {
        // 🔎 verifica CPF
        const check = await apiPublic.get(`/api/formulario/exists-cpf/${data.cpf}`);

        if (check.data.exists) {
            throw new Error("Este CPF já está cadastrado!");
        }

        // 🚀 cria inscrição
        await apiPublic.post("/api/formulario", data);
    },
};
