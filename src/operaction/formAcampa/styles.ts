import styled from "styled-components";

export const Context = styled.div`
  width: 100%;
  min-height: 92vh;

  
  animation: fadeIn 0.8s ease-in-out;


  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const CustomForm = styled.form`
  color: #1f5f5b;
  font-size: 1.1rem;
  font-weight: bold;
  letter-spacing: 0.5px;
  position: relative;
  text-transform: uppercase;
  padding: 40px 20px;
  border-bottom: 2px solid #1f5f5b;
`;

export const CustomDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 30px;

  div {
    position: relative;

    .inputName,
    .inputEmail,
    .inputDescricao {
      width: 100%;
      padding: 14px 12px;
      border: 2px solid #1f5f5b;
      border-radius: 8px;
      background-color: #fff;
      color: #000;
      font-size: 1rem;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .inputName:focus,
    .inputDescricao:focus {
      outline: none;
      border-color: #9b59b6;
      box-shadow: 0 0 10px rgba(155, 89, 182, 0.4);
    }

    .inputEmail:focus {
    .nameLabel,
    .descricaoLabel {
      position: absolute;
      font-weight: bold;
      top: 12px;
      left: 14px;
      transition: all 0.2s ease;
      color: #1f5f5b;
      font-size: 15px;
      pointer-events: none;
    }

    .inputName:focus + .nameLabel,
    .inputName:valid + .nameLabel,
    .inputDescricao:focus + .descricaoLabel,
    .inputDescricao:valid + .descricaoLabel {
      font-size: 13px;
      top: -10px;
      left: 10px;
      color: #9b59b6;
      background: #f2f2f2;
      padding: 0 4px;
    }

    .inputDescricao {
      height: 8rem;
      resize: none;
    }
  }
}

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CustomButton = styled.button`
  cursor: pointer;
  padding: 12px 60px;
  font-size: 1rem;
  background: transparent;
  color: #1f5f5b;
  border: 2px solid #1f5f5b;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background: #1f5f5b;
    color: #fff;
    box-shadow: 0 0 15px rgba(31, 95, 91, 0.6);
    transform: scale(1.05);
  }
`;
