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

/* ====== SEÇÕES PADRÃO ====== */
export const Section = styled.section`
  width: 100%;
  padding: 20px;

  .nav-link {
    cursor: pointer !important;
  }
`;

/* ====== GRADE DE EVENTOS ====== */
export const EventosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin: 0 auto;
  padding: 20px;
`;

/* ====== CARD DE EVENTO ====== */
export const EventCard = styled.div<{ selected?: boolean }>`
  background: ${({ theme }) => theme["gray-300"] || "#f2f2f2"};
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid ${({ selected }) => (selected ? "#00bfa5" : "transparent")};
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 191, 165, 0.25);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 1rem;
    color: #1f5f5b;
    font-weight: 600;
  }
`;

/* ====== CONTEÚDO DO EVENTO ====== */
export const EventContent = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  width: 100%;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  h2 {
    font-family: "Poppins", sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #214b49;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    color: #163b38;
    text-shadow: 0 0 10px rgba(33, 75, 73, 0.2);
    line-height: 1.6;
  }
`;

/* ====== BOTÕES ====== */
export const EventButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

export const CustomButton = styled.button<{ disabled?: boolean }>`
  background: transparent;
  color: #214b49;
  border: 2px solid #214b49;
  border-radius: 8px;
  padding: 10px 18px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    ${({ disabled }) =>
    !disabled &&
    `
      background: #214b49;
      color: #fff;
      transform: scale(1.05);
    `}
  }

  &:disabled {
    pointer-events: none;
  }
`;


export const ButtonClose = styled.button`
  background: transparent;
  border: 2px solid #d61818ff;
  border-radius: 8px;
  padding: 10px 18px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #df1616ff;
    color: #fff;
    transform: scale(1.05);
  }
`;

/* ====== INFO DO EVENTO ====== */
export const EventInfo = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  margin: 2rem 0;
`;

/* ====== INFO DO EVENTO 2 - MESMO PADRÃO ====== */
export const EventInfo2 = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  margin: 2rem 0;
`;

/* ====== DEPOIMENTOS ====== */
export const DepoiContent = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;

  p {
    font-size: 1.2rem;
    color: #163b38;
    text-shadow: 0 0 10px rgba(33, 75, 73, 0.2);
  }
`;


/* ===== Modal===== */
export const ModernModal = styled.div`
  padding: 28px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.25s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.97);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const ModernTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 800;
  color: #1e1e36;
  text-align: center;
  margin-bottom: 12px;
`;

export const ModernInfo = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 20px;
  text-align: center;
`;

export const ModernFooter = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 20px;
`;

export const ModernButton = styled.button`
  padding: 12px 20px;
  border-radius: 10px;
  border: none;
  background: #4f46e5;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #4338ca;
  }
`;

export const ModernCancelButton = styled(ModernButton)`
  background: #e11d48;

  &:hover {
    background: #be123c;
  }
`;

export const Img = styled.img`
    width:80%;
    height:80%px;
    object-fit:cover;
    border-radius:6px;
    border: 1px solid #ffffff21;
`;

export const PaymentCloseButton = styled.button`
  margin-top: 20px;
  background: #475569;
  color: #fff;
  padding: 12px 20px;
  border-radius: 10px;
  border: none;
  transition: 0.2s;

  &:hover {
    background: #334155;
  }
`;


