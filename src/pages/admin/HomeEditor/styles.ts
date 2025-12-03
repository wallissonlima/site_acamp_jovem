import styled from "styled-components";

/* ================== 📍 LAYOUT GERAL ================== */
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

/* ================== 📝 FORMULÁRIO ================== */
export const Form = styled.form`
  max-width: 900px;
  margin: 20px auto;
  display: grid;
  gap: 14px;
  padding: 20px;
  border-radius: 14px;
  background: #ffffff12;
  backdrop-filter: blur(6px);
  border: 1px solid #ffffff24;
  transition: .3s;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 0 15px #ffffff18;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const Label = styled.label`
  font-weight: 600;
  color: #e2e8f0;
`;

/* ================== ✍ CAMPOS INPUT / TEXTAREA ================== */
export const Input = styled.input`
  padding: 12px;
  border-radius: 10px;
  background: #00000017;
  color: #fff;
  border: 1px solid #ffffff2b;
  outline: none;
  transition: .3s;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 8px #6366f155;
  }
`;

export const Textarea = styled.textarea`
  padding: 12px;
  min-height: 100px;
  border-radius: 10px;
  background: #00000017;
  color: #fff;
  border: 1px solid #ffffff2b;
  outline: none;
  transition: .3s;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 8px #6366f155;
  }
`;

export const FileLine = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const PreviewBox = styled.div`
  width:120px;
  height:80px;
  overflow:hidden;
  border-radius:10px;
  border:1px solid #ffffff24;
  background:#00000017;
  backdrop-filter: blur(4px);
  display:flex;
  align-items:center;
  justify-content:center;

  img{
    width:100%;
    height:100%;
    object-fit:cover;
  }

  span{
    color:#ddd;
    font-size:14px;
  }
`;

/* ================== 🔘 BOTÕES ================== */
export const Btn = styled.button`
  background: linear-gradient(90deg,#6366f1,#4f46e5);
  padding:10px 14px;
  border-radius:10px;
  border:none;
  color:#fff;
  font-weight:600;
  cursor:pointer;
  transition:.3s;

  &:hover {
    transform: scale(1.02);
    opacity:.85;
  }
`;

export const BackButton = styled.button`
  background: transparent;
  border: 2px solid #6366f1;
  color: #6366f1;
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: .25s;

  &:hover {
    background:#6366f1;
    color:#fff;
    transform: scale(1.03);
  }
`;

export const DeleteButton = styled.button`
  background:#dc2626;
  color:#fff;
  padding:8px 12px;
  border:none;
  border-radius:8px;
  font-weight:600;
  cursor:pointer;
  transition:.3s;

  &:hover{
    background:#b91c1c;
    transform: scale(1.04);
  }
`;

/* ================== 📊 TABELA ================== */
export const Table = styled.table`
  width:100%;
  background:#ffffff12;
  border: 1px solid #ffffff21;
  border-radius:14px;
  overflow:hidden;
  backdrop-filter: blur(6px);
  box-shadow:0 3px 10px #00000055;

  th{
    background:#00000025;
    padding:14px;
    font-weight:700;
  }
  
  td{
    padding:14px;
  }
  
  tr:hover{
    background:#ffffff12;
  }
`;

/* ================== 🖼 IMAGEM ================== */
export const Img = styled.img`
  width:90px;
  height:60px;
  object-fit:cover;
  border-radius:8px;
  border:1px solid #ffffff24;
`;
