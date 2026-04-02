import styled, { css } from "styled-components";

type StatusMode = "success" | "pending" | "error";

type ModeProps = {
  mode: StatusMode;
};

const statusStyles = {
  success: {
    primary: "#2E7D32",
    secondary: "#E8F5E9",
    soft: "#F4FBF4",
    border: "#CDE8D0",
    shadow: "rgba(46, 125, 50, 0.18)",
  },
  pending: {
    primary: "#F59E0B",
    secondary: "#FFF7E6",
    soft: "#FFFBF2",
    border: "#F8DEAA",
    shadow: "rgba(245, 158, 11, 0.18)",
  },
  error: {
    primary: "#D64545",
    secondary: "#FDECEC",
    soft: "#FFF5F5",
    border: "#F5CACA",
    shadow: "rgba(214, 69, 69, 0.18)",
  },
};

export const Page = styled.div<ModeProps>`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: ${({ mode }) => `
    radial-gradient(circle at top, ${statusStyles[mode].soft} 0%, #f8fafc 45%, #eef2f7 100%)
  `};
`;

export const Card = styled.div<ModeProps>`
  width: 100%;
  max-width: 620px;
  background: #ffffff;
  border-radius: 28px;
  padding: 40px 32px;
  border: 1px solid ${({ mode }) => statusStyles[mode].border};
  box-shadow: 0 18px 45px ${({ mode }) => statusStyles[mode].shadow};
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0 0 auto 0;
    height: 6px;
    background: ${({ mode }) => statusStyles[mode].primary};
  }

  @media (max-width: 768px) {
    padding: 32px 20px;
    border-radius: 22px;
  }
`;

export const BrandBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  padding: 8px 14px;
  border-radius: 999px;
  background: #f4f6f8;
  color: #355070;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
`;

export const IconCircle = styled.div<ModeProps>`
  width: 88px;
  height: 88px;
  margin: 0 auto 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 800;
  color: ${({ mode }) => statusStyles[mode].primary};
  background: ${({ mode }) => statusStyles[mode].secondary};
  box-shadow: 0 10px 25px ${({ mode }) => statusStyles[mode].shadow};
`;

export const StatusTag = styled.div<ModeProps>`
  display: inline-block;
  margin-bottom: 18px;
  padding: 8px 14px;
  border-radius: 999px;
  background: ${({ mode }) => statusStyles[mode].secondary};
  color: ${({ mode }) => statusStyles[mode].primary};
  font-size: 13px;
  font-weight: 700;
`;

export const Title = styled.h1`
  margin: 0 0 14px;
  font-size: 32px;
  line-height: 1.2;
  color: #1f2937;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

export const Description = styled.p`
  max-width: 500px;
  margin: 0 auto 28px;
  font-size: 16px;
  line-height: 1.7;
  color: #6b7280;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 220px;
  padding: 14px 22px;
  border-radius: 14px;
  background: linear-gradient(135deg, #355070 0%, #1f3c88 100%);
  color: #ffffff;
  text-decoration: none;
  font-weight: 700;
  font-size: 15px;
  box-shadow: 0 10px 24px rgba(53, 80, 112, 0.25);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    color: #ffffff;
    box-shadow: 0 14px 30px rgba(53, 80, 112, 0.32);
  }
`;