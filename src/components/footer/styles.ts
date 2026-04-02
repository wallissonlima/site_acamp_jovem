import styled from "styled-components";

export const Context = styled.footer`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme["gray-400"]};
  margin-top: 40px; 
`;

export const FooterCustom = styled.div`
  width: 100%;
  padding: 28px 16px 20px; 
  border-top: 1px solid rgba(0, 0, 0, 0.08);
`;

export const FooterContent = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SectionTitle = styled.h4`
  margin: 0 0 18px; 
  font-size: 1.3rem; 
  font-weight: 800;
  text-transform: uppercase;
  text-align: center;
  color: #111827;
`;

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px; 
  width: 100%;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const ContactItem = styled.div`
  padding: 12px 14px;
  border-radius: 12px; 
   background: ${(props) => props.theme["gray-300"]};
  border: 1px solid rgba(0, 0, 0, 0.08);
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); 
`;

export const ContactLabel = styled.p`
  margin: 0 0 4px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.6);
`;

export const ContactValue = styled.a`
  font-size: 0.95rem; 
  font-weight: 700;
  color: #111827;
  text-decoration: none;

  &:hover {
    opacity: 0.7;
  }
`;

export const FooterText = styled.div`
  padding: 12px;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  background: ${(props) => props.theme["gray-300"]};

  p {
    margin: 0;
    font-size: 0.8rem; 
    color: rgba(0, 0, 0, 0.8);
  }
`;