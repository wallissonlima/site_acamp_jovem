
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Router } from "../Router";



function AppContent() {
  const location = useLocation();
  const renderParticleJsinhomePage = location.pathname === "/home";

  return (
    <>
      {renderParticleJsinhomePage && <></>}
      <Router />
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

