import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: all 0.3s ease;
  }

  body {
    background: ${(props) => props.theme["gray-400"]};
    color: ${(props) => props.theme["gray-900"]};
    -webkit-font-smoothing: antialiased;
    font: 400 1rem 'Roboto', sans-serif;
  }

  body, textarea, button, input, select {
    font: 400 1rem 'Roboto', sans-serif;
    color: ${(props) => props.theme["gray-900"]};
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme["green-500"]};
  }

  button {
    cursor: pointer;
    border: none;
    background: transparent;
  }

  /* Scrollbar futurista */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #111111;
  }

 
  ::-webkit-scrollbar-thumb:hover {
    filter: brightness(1.2);
  }
`;
