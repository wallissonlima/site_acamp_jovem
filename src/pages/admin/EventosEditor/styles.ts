import styled from "styled-components";

export const Container = styled.div`
    padding: 30px;
    min-height: 100vh;
    
    background-size: 200% 200%;
    animation: gradientMove 12s ease infinite;
    color: #e2e8f0;
    font-family: "Inter", sans-serif;

    @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;

export const Header = styled.h1`
    margin-bottom: 25px;
    font-size: 26px;
    font-weight: bold;
    text-align: center;
`;

export const BackButton = styled.button`
    background: transparent;
    border: 2px solid #6366f1;
    color: #6366f1;
    padding: 10px 18px;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 20px;
    font-weight: bold;
    transition: .25s;

    &:hover {
        background: #6366f1;
        color: #fff;
        transform: scale(1.02);
    }
`;

/* 🎨 Glass card igual ao AddBox */
export const FormCard = styled.div`
    background: #ffffff12;
    padding: 20px;
    border-radius: 14px;
    backdrop-filter: blur(6px);
    border: 1px solid #ffffff24;
    display: grid;
    gap: 12px;
    transition: .3s;

    &:hover {
        transform: scale(1.01);
        box-shadow: 0 0 15px #ffffff18;
    }
`;

export const Input = styled.input`
  padding: 12px;
  border-radius: 10px;
  background: #00000017;
  border: 1px solid #ffffff2b;
  color: #fff;
  font-size: 15px;
  outline: none;
  transition: .3s;

  &:focus{
      border-color: #6366f1;
      box-shadow: 0 0 8px #6366f155;
  }
`;

export const TextArea = styled.textarea`
    padding: 14px;
    border-radius: 10px;
    background: #00000017;
    border: 1px solid #ffffff2b;
    color: #fff;
    font-size: 15px;
    resize: none;
    min-height: 90px;
    outline: none;
    transition: .3s;

    &:focus{
        border-color: #6366f1;
        box-shadow: 0 0 8px #6366f155;
    }
`;

/* 🔥 Botão padrão roxo com gradiente */
export const ButtonSalvar = styled.button`
    background: linear-gradient(90deg,#6366f1,#4f46e5);
    border: none;
    color: #fff;
    padding: 12px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    transition:.3s;

    &:hover{
        opacity: .8;
        transform: scale(1.02);
    }
`;

/* 🔥 Tabela agora glass */
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

/* 🗑 Delete vermelho igual padrão, mas com animação */
export const DeleteButton = styled.button`
    background:#dc2626;
    color:#fff;
    padding:8px 12px;
    border-radius:8px;
    border:none;
    cursor:pointer;
    transition:.3s;

    &:hover{
        background:#b91c1c;
        transform: scale(1.02);
    }
`;
