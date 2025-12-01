import styled from "styled-components";

export const PageContainer = styled.div`
    max-width: 900px;
    margin: auto;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

export const Title = styled.h1`
    text-align: center;
    font-size: 28px;
    font-weight: bold;
`;

export const AddBox = styled.div`
    background: #ffffff12;
    padding: 20px;
    border-radius: 14px;
    backdrop-filter: blur(6px);
    border: 1px solid #ffffff21;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const TextArea = styled.textarea`
    width: 100%;
    min-height: 90px;
    padding: 14px;
    border-radius: 10px;
    border: 1px solid #ffffff2b;
    resize: none;
    outline: none;
    font-size: 15px;
    background: #00000017;
    color: #fff;
    transition: .3s;

    &:focus {
        border-color: #6366f1;
        box-shadow: 0 0 8px #6366f155;
    }
`;

export const Button = styled.button`
    background: linear-gradient(90deg,#6366f1,#4f46e5);
    border: none;
    color: #fff;
    font-weight: 600;
    padding: 12px;
    border-radius: 10px;
    cursor: pointer;
    transition: .3s;

    &:hover {
        opacity: .8;
        transform: scale(1.02);
    }
`;

export const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const ItemCard = styled.div`
    background: #ffffff12;
    border: 1px solid #ffffff24;
    border-radius: 14px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: .3s;

    &:hover {
        transform: scale(1.01);
        box-shadow: 0 0 15px #ffffff18;
    }
`;

export const DeleteBtn = styled(Button)`
    background: #dc2626;
    margin-top: 6px;

    &:hover {
        background: #b91c1c;
        transform: scale(1.02);
    }
`;
