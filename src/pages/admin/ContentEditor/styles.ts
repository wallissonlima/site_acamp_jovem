import styled from "styled-components";

export const Container = styled.div`
  padding: 30px;
  min-height: 100vh;
  color: #e2e8f0;
  font-family: "Inter", sans-serif;
`;

export const Header = styled.h1`
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
`;

export const FormCard = styled.div`
  margin: 0 auto;
  padding: 24px;
  border-radius: 16px;

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  p {
    grid-column: span 2;
    font-size: 15px;
    color: #cbd5f5;
  }

  button {
    grid-column: span 2;
    margin-top: 12px;
    padding: 14px;
    border-radius: 14px;
    border: none;
    font-weight: bold;
    background: linear-gradient(135deg, #22d3ee, #3b82f6);
    color: #020617;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* 🔹 Campo (label + input juntos) */
export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 13px;
    color: #e5e7eb;
  }

  input {
    padding: 12px;
    border-radius: 10px;
    border: none;
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
  }

  input:focus {
    outline: 2px solid #3b82f6;
  }
`;

/* 🔹 Checkbox em linha inteira */
export const CheckboxRow = styled.label`
  grid-column: span 2;
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;

  input {
    accent-color: #22c55e;
    transform: scale(1.2);
  }
`;

export const Section = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 18px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const SectionTitle = styled.h3`
  grid-column: span 2;
  font-size: 16px;
  font-weight: 600;
  color: #e5e7eb;
`;

export const SectionButton = styled.button`
  grid-column: span 2;
  margin-top: 10px;
  padding: 12px;
  border-radius: 12px;
  border: none;
  font-weight: bold;
  background: linear-gradient(135deg, #22d3ee, #3b82f6);
  color: #020617;
  cursor: pointer;
`;
