import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(140deg, #0f172a, #1e293b, #0f172a);
  background-size: 200% 200%;
  animation: gradientMove 12s ease infinite;
  color: #e2e8f0;
  font-family: "Inter", sans-serif;

  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

/* SIDEBAR ULTRA MODERNA GLASS + GLOW */
export const Sidebar = styled.aside`
  width: 280px;
  background: rgba(9, 12, 20, 0.7);
  backdrop-filter: blur(18px);
  padding: 35px 22px;
  display: flex;
  flex-direction: column;
  gap: 26px;
  border-right: 1px solid rgba(255, 255, 255, 0.08);

  box-shadow: 0 0 40px rgba(0, 255, 255, 0.05);
  animation: fadeSlide 0.7s ease;

  @keyframes fadeSlide {
    from { opacity: 0; transform: translateX(-25px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  &:hover { box-shadow: 0 0 55px rgba(0, 255, 255, 0.12); }
`;

export const Title = styled.h2`
  font-size: 1.45rem;
  font-weight: 700;
  letter-spacing: -0.6px;
  color: #fff;
  text-shadow: 0px 0px 8px rgba(0,255,255,0.35);
`;

/* BOTÕES DO PAINEL — PREMIUM */
export const Button = styled.button`
  width: 100%;
  padding: 15px 16px;
  border-radius: 12px;
  border: none;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12);
  backdrop-filter: blur(12px);
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  transition: 0.25s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0; left: -100%;
    width: 220%; height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.15),
      transparent
    );
    transition: 0.45s;
  }

  &:hover:before { left: 100%; }
  &:hover { transform: translateX(6px) scale(1.01); }
`;

/* BOTÃO PERIGO MODERNO — RED NEON */
export const ButtonDanger = styled(Button)`
  background: rgba(255, 77, 77, 0.12);
  border-color: rgba(255,77,77,0.35);
  box-shadow: 0 0 12px rgba(255,77,77,0.15) inset;

  &:hover {
    box-shadow: 0 0 25px rgba(255,77,77,0.55);
    transform: translateX(6px) scale(1.04);
  }
`;

/* ÁREA PRINCIPAL — MODERNA COM CARTÃO CENTRAL */
export const MainContent = styled.main`
  flex: 1;
  padding: 55px;
  overflow-y: auto;
  animation: fadeUp 0.5s ease;

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  display: flex;
  flex-direction: column;
  gap: 35px;

  /* CARDS PADRÃO DASHBOARD */
  .contentCard {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(18px);
    border-radius: 14px;
    padding: 32px;
    box-shadow: 0 0 35px rgba(0, 255, 255, 0.06);
    transition: 0.3s ease;

    &:hover {
      transform: scale(1.015);
      box-shadow: 0 0 45px rgba(0, 255, 255, 0.15);
    }
  }
`;
export const PageArea = styled.div`
    flex:1;
    padding:30px;
    overflow-y:auto;
`;