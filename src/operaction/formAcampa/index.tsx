import React from "react";
import { CustomDiv, CustomForm } from "./styles"; // 👈 importa o estilo que você já tem

export const FormAcampa: React.FC = () => {
  return (
    <CustomForm>
      <CustomDiv>
        <div>
          <input className="inputEmail" type="email" required />
          <label className="emailLabel">Email</label>
        </div>

        <div>
          <input className="inputName" type="text" required style={{ textTransform: "uppercase" }} />
          <label className="nameLabel">Nome Completo</label>
        </div>

        <div>
          <input className="inputName" type="text" required placeholder="DD/MM/AAAA" />
          <label className="nameLabel">Data de Nascimento</label>
        </div>

        <div>
          <input className="inputEmail" type="tel" required />
          <label className="emailLabel">Telefone com WhatsApp</label>
        </div>

        <div>
          <input className="inputName" type="text" required style={{ textTransform: "uppercase" }} />
          <label className="nameLabel">Nome para Credencial</label>
        </div>

        <div>
          <select className="inputEmail" required>
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
          <input className="inputName" type="text" required />
          <label className="nameLabel">Nome do Responsável</label>
        </div>

        <div>
          <input className="inputEmail" type="tel" required />
          <label className="emailLabel">Telefone do Responsável</label>
        </div>

        <div>
          <select className="inputEmail" required>
            <option value="">Selecione</option>
            <option>Sim</option>
            <option>Não</option>
          </select>
          <label className="emailLabel">Autorização de Imagem</label>
        </div>

        <div>
          <select className="inputEmail" required>
            <option value="">Selecione</option>
            <option>Sim</option>
            <option>Não</option>
          </select>
          <label className="emailLabel">Possui Alergia ou Restrição?</label>
        </div>

        <div style={{ gridColumn: "1 / span 2" }}>
          <textarea
            className="inputDescricao"
            placeholder="Descreva aqui se tiver alguma restrição ou alergia..."
          ></textarea>
          <label className="descricaoLabel">Descrição</label>
        </div>
      </CustomDiv>
    </CustomForm>
  );
};
