import React, { useState, forwardRef } from "react";
import { toast } from "react-toastify";
import { CustomDiv, CustomForm } from "./styles";
import { formularioServosService } from "../../services/formularioServos";
import { paymentService } from "../../services/payment";


/* 🔹 Props */
interface FormServosProps {
    onSuccess?: (data: { id: number | string }) => void;
}

/* 🔹 Máscara CPF */
function formatCPF(value: string): string {
    if (!value) return "";
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export const FormServos = forwardRef<HTMLFormElement, FormServosProps>(
    ({ onSuccess }, ref) => {
        const [formData, setFormData] = useState({
            name: "",
            email: "",
            cpf: "",
            telefone: "",
            nomeCredencial: "",
            tamanhoCamiseta: "",
            alergiaRestricao: "",
            descricao: "",
        });

        const handleChange = (
            e: React.ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
        ) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        };

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            try {
                const response = await formularioServosService.criarInscricao({
                    name: formData.name,
                    email: formData.email,
                    cpf: formData.cpf,
                    nomeCredencial: formData.nomeCredencial,
                    telefone: formData.telefone || null,
                    tamanhoCamiseta: formData.tamanhoCamiseta || null,
                    alergiaRestricao: formData.alergiaRestricao || null,
                    descricao: formData.descricao || null,
                });

                localStorage.setItem("inscricaoId", String(response.id));
                localStorage.setItem("inscricaoTipo", "SERVO");

                const pagamento = await paymentService.criarPagamento(response.id);

                toast.success("Inscrição enviada com sucesso!");

                onSuccess?.({ id: response.id });

                if (pagamento?.init_point || pagamento?.sandbox_init_point) {
                    window.location.href =
                        pagamento.init_point || pagamento.sandbox_init_point;
                    return;
                }

                toast.error("Não foi possível obter o link de pagamento.");
            } catch (error: any) {
                console.error("ERRO FRONT:", error);
                console.error("ERRO BACKEND:", error?.response?.data);
                toast.error(
                    error?.response?.data?.message ||
                    error.message ||
                    "Erro ao enviar inscrição."
                );
            }
        };

        return (
            <CustomForm ref={ref} onSubmit={handleSubmit}>
                <CustomDiv>
                    <div>
                        <input
                            name="name"
                            className="inputName"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <label>Nome Completo</label>
                    </div>

                    <div>
                        <input
                            name="email"
                            className="inputEmail"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label>Email</label>
                    </div>

                    <div>
                        <input
                            name="cpf"
                            className="inputCpf"
                            type="text"
                            maxLength={14}
                            required
                            value={formatCPF(formData.cpf)}
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/\D/g, "").slice(0, 11);
                                setFormData((prev) => ({
                                    ...prev,
                                    cpf: onlyNums,
                                }));
                            }}
                        />
                        <label>CPF</label>
                    </div>

                    <div>
                        <input
                            name="telefone"
                            className="inputEmail"
                            type="tel"
                            value={formData.telefone}
                            onChange={handleChange}
                        />
                        <label>Telefone</label>
                    </div>

                    <div>
                        <input
                            name="nomeCredencial"
                            type="text"
                            className="inputName"
                            placeholder="NOME E SOBRENOME"
                            required
                            value={formData.nomeCredencial}
                            onChange={handleChange}
                        />
                        <label>Nome para Credencial</label>
                    </div>

                    <div>
                        <select
                            name="tamanhoCamiseta"
                            className="inputEmail"
                            value={formData.tamanhoCamiseta}
                            onChange={handleChange}
                        >
                            <option value="">Selecione o tamanho</option>
                            <option>P</option>
                            <option>M</option>
                            <option>G</option>
                            <option>GG</option>
                            <option>XGG</option>
                            <option>BL-P</option>
                            <option>BL-M</option>
                            <option>BL-G</option>
                            <option>BL-GG</option>
                            <option>BL-XGG</option>
                        </select>
                        <label>Tamanho Camiseta</label>
                    </div>

                    <div>
                        <select
                            name="alergiaRestricao"
                            className="inputEmail"
                            value={formData.alergiaRestricao}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option>Sim</option>
                            <option>Não</option>
                        </select>
                        <label>Possui Alergia ou Restrição?</label>
                    </div>

                    <div style={{ gridColumn: "1 / span 2" }}>
                        <textarea
                            name="descricao"
                            className="inputDescricao"
                            placeholder="Descreva aqui se tiver alguma restrição ou alergia..."
                            value={formData.descricao}
                            onChange={handleChange}
                        />
                        <label>Descrição</label>
                    </div>
                </CustomDiv>

                <button type="submit" style={{ display: "none" }} />
            </CustomForm>
        );
    }
);