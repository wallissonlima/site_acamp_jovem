import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
 background: ${({ theme }) => theme["gray-300"] || "#f2f2f2"};
  font-family: "Inter", sans-serif;
`;

// SIDEBAR COM VIDRO + SOMBRA + ANIMAÇÃO
export const Sidebar = styled.aside`
  width: 260px;
  background: rgba(17, 24, 39, 0.85);
  backdrop-filter: blur(14px);
  color: #fff;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);

  box-shadow: 4px 0 18px rgba(0, 0, 0, 0.15);
  animation: sidebarSlide 0.4s ease;

  @keyframes sidebarSlide {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const Title = styled.h2`
  font-weight: 600;
  font-size: 22px;
  letter-spacing: -0.5px;
`;

// BOTÃO ESTILO MODERNO — HOVER COM MOVIMENTO
export const Button = styled.button`
  width: 100%;
  padding: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(4px);
  color: #fff;
  cursor: pointer;
  border-radius: 10px;
  text-align: left;
  font-size: 15px;
  transition: all 0.25s ease;

  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateX(4px);
  }
`;

export const ButtonDanger = styled(Button)`
  background: rgba(220, 38, 38, 0.15);
  border-color: rgba(220, 38, 38, 0.25);

  &:hover {
    background: rgba(220, 38, 38, 0.25);
    transform: translateX(4px);
  }
`;

// CONTEÚDO COM LAYOUT LIMPO E RESPONSIVO
export const MainContent = styled.main`
  flex: 1;
  padding: 40px;

  animation: fadeInContent 0.35s ease;

  @keyframes fadeInContent {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
