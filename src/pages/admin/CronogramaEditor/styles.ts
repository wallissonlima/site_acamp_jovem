import styled from "styled-components";

export const Container = styled.div`
    max-width: 900px;
    margin: auto;
    padding: 30px;
`;

export const Title = styled.h2`
    margin: 20px 0 10px;
    font-size: 24px;
    font-weight: 700;
    color: #f2f2f2;
`;

export const Card = styled.div`
    background: #ffffff0d;
    border-radius: 10px;
    padding: 18px;
    margin-bottom: 25px;
    border: 1px solid rgba(255,255,255,0.15);
`;

export const MilestoneBox = styled(Card)`
    background: #ffffff10;
`;

export const MilestoneHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;

    strong {
        color: white;
    }
`;

export const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 200px;
    gap: 12px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 12px;
    background: #ffffff18;
    border: 1px solid rgba(255,255,255,.2);
    border-radius: 8px;
    color: white;
    outline: none;
    transition: 0.2s;

    &:focus {
        border-color: #00d4ff;
        box-shadow: 0 0 6px #00d4ff6d;
    }
`;

export const ButtonAdd = styled.button`
    background: #00d4ff;
    padding: 12px;
    border-radius: 8px;
    width: 100%;
    margin-top: 10px;
    cursor: pointer;
    font-weight: bold;
`;

export const ButtonSave = styled(ButtonAdd)`
    background: #7c3aed;
    margin-top: 15px;
`;

export const ButtonDelete = styled.button`
    background: #ff275b;
    padding: 6px 12px;
    border-radius: 6px;
    color: white;
    cursor: pointer;
`;

/* 🔥 TABELA padrão do outro estilo */
export const Table = styled.table`
    width:100%;
    margin-top: 20px;
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