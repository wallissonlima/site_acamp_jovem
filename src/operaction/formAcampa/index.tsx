import React, { useState, forwardRef } from "react";
import { CustomDiv, CustomForm } from "./styles";
import { toast } from "react-toastify";
import type { iFormularioProps } from "../../interfaces/iFomulario";
import { formularioService } from "../../services/formulario";

// 👉 FUNÇÃO DA MÁSCARA DE CPF
function formatCPF(value: string) {
  if (!value) return "";
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export const FormAcampa = forwardRef<HTMLFormElement, { onSuccess?: () => void }>(
  ({ onSuccess }, ref) => {
    const [formData, setFormData] = useState<iFormularioProps>({
      name: "",
      email: "",
      dataNascimento: "",
      cpf: "",
      telefone: "",
      nomeCredencial: "",
      tamanhoCamiseta: "",
      nomeResponsavel: "",
      telefoneResponsavel: "",
      autorizacaoImagem: "",
      alergiaRestricao: "",
      descricao: "",
    });

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (
        formData.telefone &&
        formData.telefoneResponsavel &&
        formData.telefone === formData.telefoneResponsavel
      ) {
        toast.error("O telefone do participante não pode ser o mesmo do responsável.");
        return;
      }

      try {
        const payload: iFormularioProps = {
          name: formData.name,
          email: formData.email,
          cpf: formData.cpf,
          nomeCredencial: formData.nomeCredencial,
          telefone: formData.telefone || undefined,
          dataNascimento: formData.dataNascimento || undefined,
          nomeResponsavel: formData.nomeResponsavel || undefined,
          telefoneResponsavel: formData.telefoneResponsavel || undefined,
          tamanhoCamiseta: formData.tamanhoCamiseta || undefined,
          autorizacaoImagem: formData.autorizacaoImagem || undefined,
          alergiaRestricao: formData.alergiaRestricao || undefined,
          descricao: formData.descricao || undefined,
        };

        await formularioService.criarInscricao(payload);

        toast.success("Inscrição enviada com sucesso!");
        onSuccess?.();

        setFormData({
          name: "",
          email: "",
          dataNascimento: "",
          cpf: "",
          telefone: "",
          nomeCredencial: "",
          tamanhoCamiseta: "",
          nomeResponsavel: "",
          telefoneResponsavel: "",
          autorizacaoImagem: "",
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
              style={{ textTransform: "uppercase" }}
              value={formData.name}
              onChange={handleChange}
            />
            <label className="nameLabel">Nome Completo</label>
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
            <label className="emailLabel">Email</label>
          </div>

          <div>
            <input
              name="cpf"
              className="inputCpf"
              type="text"
              required
              maxLength={14}
              value={formatCPF(formData.cpf)}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/g, "").slice(0, 11);
                setFormData((prev) => ({ ...prev, cpf: onlyNums }));
              }}
            />
            <label className="nameLabel">CPF</label>
          </div>

          <div>
            <input
              name="dataNascimento"
              className="inputName"
              type="date"
              required
              value={formData.dataNascimento}
              onChange={handleChange}
            />
            <label className="nameLabel">Data de Nascimento</label>
          </div>

          <div>
            <input
              name="telefone"
              className="inputEmail"
              type="tel"
              value={formData.telefone}
              onChange={handleChange}
            />
            <label className="emailLabel">Telefone com WhatsApp</label>
          </div>

          <div>
            <input
              name="nomeCredencial"
              className="inputName"
              type="text"
              required
              style={{ textTransform: "uppercase" }}
              value={formData.nomeCredencial}
              onChange={handleChange}
              placeholder="NOME E SOBRENOME"
            />
            <label className="nameLabel">Nome para Credencial</label>
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
            <label className="emailLabel">Tamanho da Camiseta</label>
          </div>

          <div>
            <input
              name="nomeResponsavel"
              className="inputName"
              type="text"
              value={formData.nomeResponsavel}
              onChange={handleChange}
            />
            <label className="nameLabel">Nome do Responsável</label>
          </div>

          <div>
            <input
              name="telefoneResponsavel"
              className="inputEmail"
              type="tel"
              value={formData.telefoneResponsavel}
              onChange={handleChange}
            />
            <label className="emailLabel">Telefone do Responsável</label>
          </div>

          <div>
            <select
              name="autorizacaoImagem"
              className="inputEmail"
              value={formData.autorizacaoImagem}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option>Sim</option>
              <option>Não</option>
            </select>
            <label className="emailLabel">Autorização de Imagem</label>
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
              value={formData.descricao}
              onChange={handleChange}
            />
            <label className="descricaoLabel">Descrição</label>
          </div>
        </CustomDiv>

        <button type="submit" style={{ display: "none" }}></button>
      </CustomForm>
    );
  }
);