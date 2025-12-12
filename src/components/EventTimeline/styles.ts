import styled from "styled-components";

export const Container = styled.div`
    padding: 28px;
    background: ${({ theme }) => theme["gray-400"] || "#f2f2f2"};
    color: #1a1a1a; /* <<< cor principal do texto agora escura */
    border-radius: 14px;
    width: 100%;
    max-width: 1400px;
    margin: 10px auto 0;
    box-shadow: 0 4px 22px rgba(0,0,0,0.4);
`;

/* Cabeçalho */
export const Section = styled.div`
    margin-bottom: 30px;
`;

export const Title = styled.h2`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #111; /* título escuro */
`;

export const Label = styled.p`
    opacity: .85;
    font-size: 15px;
    color: #222; /* label escuro */
`;

/* Contagem */
export const Countdown = styled.h3`
    font-size: 32px;
    font-weight: 800;
    margin: 14px 0 18px;
    color: #0a0a0a; /* destaque escuro */
`;

/* Barra de progresso */
export const ProgressBar = styled.div`
    width: 100%;
    background: rgba(7, 7, 7, 0.15);
    height: 12px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 14px;
`;

export const ProgressFill = styled.div`
    height: 100%;
    background: linear-gradient(90deg, #935cf1ff, #2933beff);
    transition: width .6s ease;
`;

/* Data */
export const DateText = styled.p`
    font-size: 15px;
    opacity: .85;
    color: #222;
    margin-top: 6px;
`;

/* Timeline */
export const MilestoneList = styled.ul`
    list-style: none;
    padding-left: 0;
    margin-top: 15px;
`;

export const MilestoneItem = styled.li`
    margin-bottom: 14px;
    padding: 12px 14px;
    border-left: 4px solid #7c3aed;
    background: rgba(0,0,0,0.06);
    border-radius: 6px;

    strong {
        font-size: 16px;
        color: #0d0d0d; /* título dark */
        display: block;
    }

    small {
        opacity: .7;
        font-size: 13px;
        color: #222; /* texto menor escuro */
    }

    &:hover {
        transform: translateX(4px);
        background: rgba(0,0,0,0.12);
        transition: .25s;
    }
`;
