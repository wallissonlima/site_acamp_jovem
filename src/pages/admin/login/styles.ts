import styled from "styled-components";
import { Input as RSInput } from "reactstrap";

export const Context = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 100px;
  background: ${(props) => props.theme["gray-500"]};
  display: flex;
  flex-direction: column;
  z-index: 1;

  img {
    width: 50%;
    @media (max-width: 1024px) {
      width: 30%;
    }

    @media (max-width: 768px) {
      width: 15rem;
    }

    @media (max-width: 480px) {
      width: 10rem;
    }
  }

  .logKings {
    width: 6rem;

    @media (max-width: 768px) {
      width: 4rem;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: small;
    color: ${(props) => props.theme["purple-500"]};
    margin-top: auto;
    padding: 10px;
    flex-wrap: wrap;
    gap: 10px;
    text-align: center;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
`;

export const FromCotainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  max-width: 22rem;
  margin: 0 auto;
  background-color: rgba(126, 34, 206, 0.15);
  border-radius: 15px;
  padding: 1rem;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    max-width: 280px;
    height: 40px;
    padding: 0 1rem;
    margin: 5px auto;
    font-weight: bold;
    border: 1px solid rgba(126, 34, 206, 0.5);
    background-color: rgba(243, 232, 255, 0.5);
    color: ${(props) => props.theme["purple-500"]};
    border-radius: 20px;
    outline: none;
    text-align: center;

    ::placeholder {
      color: #581c87;
    }
  }

  button {
    width: 100%;
    max-width: 140px;
    padding: 12px;
    margin: 0 auto;
    font-size: 1.2em;
    background: ${(props) => props.theme["purple-400"]};
    color: ${(props) => props.theme.white};
    font-weight: bold;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    transition: 0.2s;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${(props) => props.theme["purple-500"]};
    }
  }
`;

export const CustomSenha = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    font-size: 90%;
    font-weight: bold;
    color: ${(props) => props.theme["purple-500"]};
    text-decoration: none;

    &:hover {
      color: ${(props) => props.theme["purple-700"]};
    }
  }
`;

export const CustonCheck = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 8rem;

  .form-check-label {
    color: ${(props) => props.theme.white};
    font-size: 90%;
    font-weight: bold;
  }

  .inputCheck {
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    border-radius: 0.25rem;
    border: 2px solid ${(props) => props.theme["purple-400"]};
    transition: background-color 0.3s, border-color 0.3s;
  }

  .inputCheck:checked {
    background-color: ${(props) => props.theme["purple-500"]};
    border-color: ${(props) => props.theme["purple-600"]};
  }
`;

export const CustomButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${(props) => props.theme["purple-500"]};
  border-radius: 12px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;
  margin: 0 auto;
  height: 40px;

  &:hover {
    background-color: ${(props) => props.theme["purple-300"]};
    border-color: ${(props) => props.theme["purple-600"]};
  }
`;

export const CunstomButtonSenha = styled.div`
  color: ${(props) => props.theme.white};
  background: none;
  border: none;
  padding: 0;
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
`;
export const Input = styled(RSInput)`
  box-sizing: border-box;
  width: 100%;
  max-width: 280px;
  height: 40px;
  padding: 0 1rem;
  margin: 5px auto;
  font-weight: bold;
  border: 1px solid rgba(126, 34, 206, 0.5);
  background-color: rgba(243, 232, 255, 0.5);
  color: ${(props) => props.theme["purple-500"]};
  border-radius: 20px;
  outline: none;
  text-align: center;

  &::placeholder {
    color: #581c87;
  }
`;
