import styled from "styled-components";

/* ====== CONTAINER PRINCIPAL ====== */
export const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.8s ease-in-out;
  width: 100%;
  overflow-x: hidden;
  padding-bottom: 40px;
  

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  section {
    width: 100%;
  }

  h1 {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 20px;
    font-family: "Poppins", "Segoe UI", Roboto, sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: #1f5f5b;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    text-shadow: 0 0 15px rgba(31, 95, 91, 0.3);
    transition: color 0.3s ease;

    &:hover {
      color: #00bfa5;
    }
  }
`;