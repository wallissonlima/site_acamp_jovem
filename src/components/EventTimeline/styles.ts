import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 16px;
`;

export const Section = styled.section`
  background: ${(props) => props.theme["gray-300"]};
  border-radius: 20px;
  padding: 40px 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  width: 100%;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 10px;
`;

export const Label = styled.p`
  font-size: 1rem;
  color: #444;
  font-weight: 500;
  margin-bottom: 8px;
`;

export const Countdown = styled.h3`
  font-size: 4rem;
  font-weight: 800;
  font-family: "Roboto Mono", monospace;
  color: #111;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 16px;
  border-radius: 10px;
  background: #e4e4e4;
  overflow: hidden;
  margin-bottom: 20px;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #06b6d4);
  transition: width 0.3s ease;
`;

export const DateText = styled.p`
  font-size: 1.2rem;
  color: #333;
  font-weight: 600;
`;
