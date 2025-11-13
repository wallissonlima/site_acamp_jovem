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
    border-radius: 8px;
    margin-bottom: 10px;
    object-fit: cover;
  }

  h3 {
    font-size: 1rem;
    color: #1f5f5b;
    font-weight: 600;
  }
`;

/* ====== CONTEÚDO DO EVENTO (ex: Acampa Jovem) ====== */
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
  }

  img:hover {
    transform: scale(1.02);
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
  margin-top: 18rem;
`;

export const CustomButton = styled.button`
  background: transparent;
  color: #214b49;
  border: 2px solid #214b49;
  border-radius: 8px;
  padding: 10px 18px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #214b49;
    color: #fff;
    transform: scale(1.05);
  }
`;

/* ====== INFO DO EVENTO ====== */
export const EventInfo = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
`;

/* ====== DEPOIMENTOS (SEÇÃO NOVA) ====== */
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
