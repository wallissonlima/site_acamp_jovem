import React, { useState, forwardRef } from "react";
import axios from "axios";
import { CustomDiv, CustomForm } from "./styles";
import { toast } from "react-toastify";

// 👉 FUNÇÃO DA MÁSCARA DE CPF AQUI
function formatCPF(value) {
  if (!value) return "";
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export const FormAcampa = forwardRef(({ onSuccess }, ref) => {
  const [formData, setFormData] = useState({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Converte dataNascimento para Date (ou null)
    const payload = {
      ...formData,
      dataNascimento: formData.dataNascimento
        ? new Date(formData.dataNascimento.split("/").reverse().join("-"))
        : null,
      telefone: formData.telefone || null,
      nomeResponsavel: formData.nomeResponsavel || null,
      telefoneResponsavel: formData.telefoneResponsavel || null,
      tamanhoCamiseta: formData.tamanhoCamiseta || null,
      autorizacaoImagem: formData.autorizacaoImagem || null,
      alergiaRestricao: formData.alergiaRestricao || null,
      descricao: formData.descricao || null,
    };

    try {
      await axios.post("http://localhost:3000/api/formulario", payload);
      toast("Inscrição enviada com sucesso!");
      if (onSuccess) onSuccess();
      // Resetar form
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
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar inscrição. Verifique os dados e tente novamente.");
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
            maxLength={14} // agora 000.000.000-00 tem 14 caracteres
            value={formatCPF(formData.cpf)}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/\D/g, "").slice(0, 11);
              handleChange({
                target: { name: "cpf", value: onlyNums }
              });
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
            placeholder="DD/MM/AAAA"
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
            placeholder="Descreva aqui se tiver alguma restrição ou alergia..."
            value={formData.descricao}
            onChange={handleChange}
          />
          <label className="descricaoLabel">Descrição</label>
        </div>
      </CustomDiv>

      {/* botão escondido para submit via modal */}
      <button type="submit" style={{ display: "none" }}></button>
    </CustomForm>
  );
});
