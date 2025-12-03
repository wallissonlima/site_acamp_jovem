import styled from "styled-components";

export const Container = styled.div`
    padding: 10px;
    min-height: 100vh;
   
    color:#fff;
`;
export const Header = styled.h1`
  display: flex;
  justify-content: space-between; // espaço entre texto e botão
  align-items: center; // centraliza verticalmente
  margin-bottom: 25px;
  font-size: 26px;
  font-weight: bold;
  color: #fff;
`;

export const ButtonEditor = styled.div`
  display: flex;
  gap: 10px;       // espaço entre os botões
  justify-content: flex-start; // alinhados à esquerda
  margin-top: 10px; // espaço em cima, opcional
`;


/* 🔥 TABELA padrão do outro estilo */
export const Table = styled.table`
    width:100%;
    background:#ffffff12;
    border: 1px solid #ffffff21;
    border-radius:14px;
    backdrop-filter: blur(6px);
    overflow:hidden;
    color:#fff;
    box-shadow:0 3px 10px #00000055;
    margin-top: 15px;

    th{
        background:#00000025;
        padding:14px;
    }

    td{
        padding:14px;
    }

    tr:hover{
        background:#ffffff12;
    }
`;

export const Img = styled.img`
    width:90px;
    height:60px;
    object-fit:cover;
    border-radius:6px;
    border: 1px solid #ffffff21;
`;

export const DeleteButton = styled.button`
    background: transparent;
    border: 2px solid #e75c5cff;
    color: #e75c5cff;
    padding: 10px 18px;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 20px;
    font-weight: bold;
    transition: .25s;

    &:hover {
        background:#6c5ce7;
        color:#fff;
    }
`;

export const BackButton = styled.button`
    background: transparent;
    border: 2px solid #6c5ce7;
    color: #6c5ce7;
    padding: 10px 18px;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 20px;
    font-weight: bold;
    transition: .25s;

    &:hover {
        background:#6c5ce7;
        color:#fff;
    }
`;