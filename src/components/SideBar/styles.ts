import styled from "styled-components";

export const SidebarContainer = styled.aside<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ open }) => (open ? "0" : "-260px")};
  width: 260px;
  height: 100vh;
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  box-shadow: ${({ open }) =>
    open ? "4px 0 20px rgba(0,0,0,0.4)" : "none"};
  border-right: 1px solid rgba(255, 255, 255, 0.05);

  /* === Desktop === */
  @media (min-width: 768px) {
    position: relative; /* Entra no fluxo do layout */
    left: 0;
    width: 220px;
    height: 100vh;
    z-index: 1; /* Não sobrepõe o conteúdo */
    box-shadow: none;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    transition: none;
  }
`;


export const SidebarHeader = styled.div`
  padding: 1.8rem 1.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const SidebarMenu = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.9rem 1.2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  color: #e0e0e0;

  &:hover {
    background: rgba(155, 89, 182, 0.1);
    box-shadow: 0 0 8px rgba(155, 89, 182, 0.3);
    transform: translateX(4px);
  }

  &.active {
    background: rgba(155, 89, 182, 0.2);
    box-shadow: 0 0 12px rgba(155, 89, 182, 0.4);
    border-left: 4px solid #9b59b6;
    color: #fff;
  }

  span {
    font-size: 1rem;
    transition: color 0.3s ease;
  }
`;

export const ToggleButton = styled.button`
  position: fixed;
  top: 65px;
  left: 12px;
  background: #222;
  border: none;
  color: #fff;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  z-index: 1100;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #333;
    transform: scale(1.05);
  }

  @media (min-width: 768px) {
    display: none;
  }

  svg {
    display: block;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.45);
  z-index: 900;
  backdrop-filter: blur(2px);

  @media (min-width: 768px) {
    display: none;
  }
`;
