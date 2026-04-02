import styled from "styled-components";

export const Context = styled.div`
  width: 100%;
  min-height: 92vh;
  padding: 4rem 1.5rem;
  background: ${({ theme }) => theme["gray-300"]};
`;

export const ContactContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const ContactCard = styled.div`
  background:  ${({ theme }) => theme["gray-300"]};
  border-radius: 16px;
  padding: 40px 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
`;

export const CustomForm = styled.form`
  width: 100%;
`;

export const CustomDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InputGroup = styled.div`
  position: relative;

  &.fullWidth {
    grid-column: 1 / -1;
  }

  .input {
    width: 100%;
    padding: 18px 14px;
    border: 2px solid ${({ theme }) => theme["green-400"]};
    border-radius: 10px;
    background: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme["gray-900"]};
    font-size: 1rem;
    transition: 0.3s;
  }

  .input:hover {
    box-shadow: 0 4px 12px ${({ theme }) => theme["gray-400"]}40;
  }

  .input:focus {
    outline: none;
    border-color: ${({ theme }) => theme["green-300"]};
    box-shadow: 0 0 10px ${({ theme }) => theme["green-300"]}50;
  }

  .textarea {
    min-height: 140px;
    resize: vertical;
  }

  .label {
    position: absolute;
    top: 16px;
    left: 14px;
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme["green-400"]};
    transition: 0.2s;
    pointer-events: none;
  }

  .input:focus + .label,
  .input:valid + .label {
    top: -8px;
    left: 10px;
    font-size: 12px;
    background: ${({ theme }) => theme.white};
    padding: 0 4px;
  }
`;

export const CustomButton = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 1rem;
  background: ${({ theme }) => theme["green-400"]};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${({ theme }) => theme["green-300"]};
    box-shadow: 0 0 12px ${({ theme }) => theme["green-400"]}60;
  }
`;