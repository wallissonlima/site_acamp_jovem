import React, { useState, forwardRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CustomDiv, CustomForm } from "./styles";
import { formularioServosService } from "../../services/formularioServos";

/* 🔹 Props */
interface FormServosProps {
    onSuccess?: () => void;
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
                await formularioServosService.criarInscricao({
                    name: formData.name,
                    email: formData.email,
                    cpf: formData.cpf,
                    nomeCredencial: formData.nomeCredencial,
                    telefone: formData.telefone || null,
                    tamanhoCamiseta: formData.tamanhoCamiseta || null,
                    alergiaRestricao: formData.alergiaRestricao || null,
                    descricao: formData.descricao || null,
                });

                toast.success("Inscrição enviada com sucesso!");
                onSuccess?.();

                setFormData({
                    name: "",
                    email: "",
                    cpf: "",
                    telefone: "",
                    nomeCredencial: "",
                    tamanhoCamiseta: "",
                    alergiaRestricao: "",
                    descricao: "",
                });

            } catch (error: any) {
                toast.error(error.message || "Erro ao enviar inscrição.");
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
                                const onlyNums = e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 11);
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
                            placeholder="Nome e sobrenome"
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
                        <label className="emailLabel">Possui Alergia ou Restrição?</label>
                    </div>

                    <div style={{ gridColumn: "1 / span 2" }}>
                        <textarea
                            name="descricao"
                            className="inputDescricao"
                            placeholder="Descreva aqui se tiver alguma restrição ou alergia..."
                            value={formData.descricao}
                            onChange={handleChange}
                        />
                        <label className="descricaoLabel">Descrição</label>
                    </div>
                </CustomDiv>

                {/* submit invisível */}
                <button type="submit" style={{ display: "none" }} />
            </CustomForm>
        );
    }
);
