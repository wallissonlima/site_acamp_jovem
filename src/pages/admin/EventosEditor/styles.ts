import styled from "styled-components";

export const Container = styled.div`
    padding: 30px;
    min-height: 100vh;
    background:#1e1e36; /* Fundo com a mesma estética */
    color:#fff;
`;

export const Header = styled.h1`
    margin-bottom: 25px;
    font-size: 26px;
    font-weight: bold;
    color:#fff;
`;

export const FormCard = styled.div`
    padding: 20px;
    border-radius: 12px;
    /* box-shadow: 0 8px 50px rgba(250, 248, 248, 0.68); */
    box-shadow: 0 3px 20px rgba(0,0,0,0.40);
    margin-bottom: 30px;
    background:#2c2c54;
    display: grid;
    gap: 12px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  background:#474787;
  color:#fff;
  border:1px solid #706fd3;

  &:focus{
      outline:none;
      border-color:#a29bfe;
      box-shadow:0 0 0 2px rgba(162,155,254,.5);
  }
`;

export const TextArea = styled.textarea`
    padding: 12px;
    border-radius: 8px;
    background:#474787;
    color:#fff;
    border:1px solid #706fd3;
    height: 80px;
    font-size: 15px;
    resize: none;
`;

export const ButtonSalvar = styled.button`
    background:#6c5ce7;
    color:#fff;
    padding:12px;
    border-radius:8px;
    border:none;
    font-size:16px;
    cursor:pointer;
    transition:.2s;

    &:hover{ background:#5a4ed6; }
`;

/* 🔥 TABELA padrão do outro estilo */
export const Table = styled.table`
    width:100%;
    background:#2c2c54;
    color:#fff;
    border-radius:12px;
    overflow:hidden;
    box-shadow:0 3px 10px rgba(0,0,0,0.07);

    th{
        background:#474787;
        padding:14px;
    }

    td{
        padding:14px;
    }

    tr:hover{
        background:#706fd3;
    }
`;

export const Img = styled.img`
    width:90px;
    height:60px;
    object-fit:cover;
    border-radius:6px;
`;

export const DeleteButton = styled.button`
    background:#e84141;
    color:#fff;
    padding:8px 12px;
    border-radius:6px;
    border:none;
    cursor:pointer;
    transition:.2s;

    &:hover{ background:#c92e2e; }
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
