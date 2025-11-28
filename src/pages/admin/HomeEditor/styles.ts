import styled from "styled-components";

/* ================== 📍 LAYOUT GERAL ================== */
export const Container = styled.div`
  padding: 30px;
  min-height: 100vh;
  background: #1e1e36;
  color: #fff;
`;

/* ================== 📝 FORMULÁRIO ================== */
export const Form = styled.form`
  max-width: 900px;
  margin: 20px auto;
  display: grid;
  gap: 14px;
  padding: 20px;
  border-radius: 12px;
  background: #2c2c54;
  color: #fff;
  box-shadow: 0 3px 20px rgba(0,0,0,0.40);
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
  color: #f5f6fa;
`;

/* ================== ✍ CAMPOS INPUT / TEXTAREA ================== */
export const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  background: #474787;
  color: #fff;
  border: 1px solid #706fd3;
  &:focus{
    outline: none;
    border-color: #a29bfe;
    box-shadow: 0 0 0 2px rgba(162,155,254,.5);
  }
`;

export const Textarea = styled.textarea`
  padding: 10px;
  min-height: 100px;
  border-radius: 8px;
  background: #474787;
  color: #fff;
  border: 1px solid #706fd3;
  &:focus{
    outline: none;
    border-color: #a29bfe;
    box-shadow: 0 0 0 2px rgba(162,155,254,.5);
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
  border-radius:8px;
  border:2px solid #706fd3;
  display:flex;
  align-items:center;
  justify-content:center;
  
  img{
    width:100%;
    height:100%;
    object-fit:cover;
  }
  span{
    color:#ccc;
  }
`;

/* ================== 🔘 BOTÕES ================== */
export const Btn = styled.button`
  background: #706FD3;
  color:#fff;
  padding:10px 14px;
  border-radius:10px;
  border:none;
  cursor:pointer;
  font-weight:600;
  transition:.25s;
  &:hover{
    background:#a29bfe;
  }
`;

export const BackButton = styled.button`
  background:transparent;
  border:2px solid #a29bfe;
  color:#a29bfe;
  padding:10px 18px;
  border-radius:8px;
  cursor:pointer;
  font-weight:700;
  transition:.25s;
  &:hover{
    background:#a29bfe;
    color:#fff;
  }
`;

export const DeleteButton = styled.button`
  background:#e84141;
  color:#fff;
  padding:8px 12px;
  border:none;
  border-radius:6px;
  font-weight:600;
  cursor:pointer;
  transition:.25s;
  &:hover{
    background:#ff4d4d;
  }
`;

/* ================== 📊 TABELA ================== */
export const Table = styled.table`
  width:100%;
  background:#2c2c54;
  color:#fff;
  border-radius:12px;
  overflow:hidden;
  box-shadow:0 3px 10px rgba(0,0,0,0.15);

  th{
    background:#474787;
    padding:14px;
    font-weight:700;
  }
  
  td{
    padding:14px;
  }
  
  tr:hover{
    background:#706fd3;
  }
`;

/* ================== 🖼 IMAGEM ================== */
export const Img = styled.img`
  width:90px;
  height:60px;
  object-fit:cover;
  border-radius:6px;
`;
