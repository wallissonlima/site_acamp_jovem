import styled from "styled-components";

export const Context = styled.div`
  width: 100%;
  min-height: 92vh;
  overflow-y: none;
  padding: 4rem;
  background: ${({ theme }) => theme["gray-300"] || "#f2f2f2"};
`;

export const CustomForm = styled.form`
  color: #1f5f5b;
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1rem;
  letter-spacing: 0.5px;
  position: relative;
  text-transform: uppercase;
  padding: 40px 10px;
  border-bottom: 2px solid #1f5f5b;
`;

export const CustomDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  margin-bottom: 30px;

  div {
    position: relative;

    .inputName,
    .inputEmail,
    .inputDescricao {
      width: 100%;
      padding: 16px 14px;
      border: 2px solid #1f5f5b;
      border-radius: 8px;
      transition: all 0.3s ease;
      position: relative;
      background-color: #fff; /* 👈 fundo branco */
      color: #000;
      font-size: 1rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* leve profundidade */
    }

    .inputName:focus,
    .inputEmail:focus,
    .inputDescricao:focus {
      outline: none;
      border-color: #26d3c7ff; /* 👈 foco roxo */
      box-shadow: 0 0 8px rgba(89, 182, 101, 0.4);
    }

    .nameLabel,
    .emailLabel,
    .descricaoLabel {
      position: absolute;
      font-weight: bold;
      top: 14px;
      left: 18px;
      transition: all 0.2s ease;
      color: #1f5f5b;
      font-size: 15px;
      pointer-events: none;
      background: transparent;
    }

    /* 🔹 Animação da label quando o campo é focado ou preenchido */
    .inputName:focus + .nameLabel,
    .inputName:valid + .nameLabel,
    .inputEmail:focus + .emailLabel,
    .inputEmail:valid + .emailLabel,
    .inputDescricao:focus + .descricaoLabel,
    .inputDescricao:valid + .descricaoLabel {
      font-size: 13px;
      top: -10px;
      left: 10px;
      color: #1f5f5b;
      background: #f2f2f2;
      padding: 0 4px;
    }

    .inputDescricao {
      height: 10rem;
      resize: none;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CustomButton = styled.button`
  cursor: pointer;
  padding: 10px 70px;
  font-size: 1rem;
  background: transparent;
  color: #1f5f5b;
  border: 1.5px solid #1f5f5b;
  border-radius: 5px;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    background: #1f5f5b;
    box-shadow: 0 0 15px rgba(31, 95, 91, 0.6);
  }
`;
