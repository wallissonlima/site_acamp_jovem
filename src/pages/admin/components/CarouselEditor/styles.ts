import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
    color: #fff;
`;

export const Grid = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
`;

export const ItemCard = styled.div`
    background: #11152b;
    padding: 15px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid #2c2f48;
`;

export const PreviewImg = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
`;

export const InputFile = styled.input`
    margin-top: 5px;
`;

export const InputText = styled.input`
    padding: 10px;
    background: #0c1020;
    color: #fff;
    border: 1px solid #2c2f48;
    border-radius: 10px;
`;

export const ButtonAdd = styled.button`
    padding: 10px 20px;
    background: #4caf50;
    border-radius: 10px;
    color: white;
    border: none;
`;

export const ButtonSave = styled.button`
    margin-top: 20px;
    padding: 12px 30px;
    background: #007bff;
    border-radius: 10px;
    color: white;
    border: none;
`;

export const ButtonDelete = styled.button`
    padding: 10px;
    background: #d9534f;
    border-radius: 8px;
    color: white;
    border: none;
`;
