import styled from "styled-components";
import { CreditCard } from "lucide-react";

/* 🔹 helpers */
export const formatBRL = (value: number) =>
    value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

/* 🔹 styles */
export const PaymentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 20px;
    align-items: center;
`;

export const PayButton = styled.button<{ loading: boolean }>`
    width: 100%;
    max-width: 360px;
    padding: 14px 20px;
    border-radius: 14px;
    border: none;

    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: #fff;

    font-size: 16px;
    font-weight: 600;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    cursor: pointer;
    transition: all 0.25s ease;

    opacity: ${({ loading }) => (loading ? 0.7 : 1)};
    pointer-events: ${({ loading }) => (loading ? "none" : "auto")};

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 30px rgba(34, 197, 94, 0.35);
    }
`;

export const WalletBox = styled.div`
    width: 100%;
    max-width: 360px;
    padding: 14px;
    border-radius: 14px;
    background: #0f172a;
    box-shadow: inset 0 0 0 1px #1e293b;
`;
