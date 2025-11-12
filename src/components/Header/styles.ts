import styled from "styled-components";

export const Context = styled.nav`
  background: linear-gradient(90deg, #fff, #1a1a1a); /* 👈 Fundo preto */
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
  padding: 0 1.5rem;
  height: 60px;

  .navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .logo-container {
    display: flex;
    align-items: center;
  }

  .navbar-toggler {
    border: none;
    color: #fff; /* branco */
    font-size: 1.8rem;
    transition: transform 0.3s ease, color 0.3s ease;

    &:hover {
      transform: rotate(90deg);
      color: #ccc; /* leve mudança no hover */
    }
  }

  .nav-item {
    margin: 0 0.7rem;
  }

  .nav-link {
    font-size: 1rem;
    font-weight: bold;
    color: #fff; /* branco */
    text-transform: uppercase;
    text-decoration: none;
    position: relative;
    letter-spacing: 1.5px;
    transition: all 0.3s ease;
    line-height: 80px;

    &::after {
      content: "";
      display: block;
      height: 2px;
      width: 0;
      background: #fff; /* linha branca */
      transition: width 0.3s ease;
      position: absolute;
      bottom: 15px;
      left: 0;
    }

    &:hover {
      color: #ccc;
      text-shadow: 0 0 8px #fff;

      &::after {
        width: 100%;
      }
    }

    &.active {
      color: #fff;
      text-shadow: 0 0 10px #fff;
    }
  }

  @media only screen and (max-width: 768px) {
    height: auto;
    .navbar-container {
      flex-wrap: wrap;
    }

    .collapse {
      width: 100%;
      background: rgba(15, 15, 15, 0.95);
      padding: 1rem 0;
      margin-top: 0.5rem;
    }

    .nav-link {
      line-height: normal;
    }

    .nav-item {
      text-align: right;
      padding: 0.5rem 1rem;
    }
  }

  .icon-container{
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
`;

export const Logo = styled.img`
  margin-top: 1px;
  height: 50px;
  width: 100%;
  object-fit: contain;
  display: block;
`;
