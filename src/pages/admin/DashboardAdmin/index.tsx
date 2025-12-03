import { SignOut } from "phosphor-react";
import { Container, Sidebar, Title, Button, ButtonDanger, PageArea } from "./styles";
import { useNavigate, useLocation } from "react-router-dom";

export function DashboardAdmin({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation(); // pega a rota atual

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/admin/login");
  }

  return (
    <Container>
      {/* SIDEBAR */}
      <Sidebar>
        <Title>Painel Admin</Title>

        <Button
          active={location.pathname === "/admin/home"}
          onClick={() => navigate("/admin/home")}
        >
          Home
        </Button>
        <Button
          active={location.pathname === "/admin/cronograma"}
          onClick={() => navigate("/admin/cronograma")}
        >
          Cronogramas
        </Button>
        <Button
          active={location.pathname === "/admin/depoimentos"}
          onClick={() => navigate("/admin/depoimentos")}
        >
          Depoimentos
        </Button>
        <Button
          active={location.pathname === "/admin/eventos"}
          onClick={() => navigate("/admin/eventos")}
        >
          Eventos
        </Button>
        <Button
          active={location.pathname === "/admin/config"}
          onClick={() => navigate("/admin/config")}
        >
          Carousel
        </Button>
        <Button
          active={location.pathname === "/admin/exports"}
          onClick={() => navigate("/admin/exports")}
        >
          Exporta excel
        </Button>

        <ButtonDanger onClick={handleLogout}><SignOut size={15} /> Sair</ButtonDanger>
      </Sidebar>

      <PageArea>{children}</PageArea>
    </Container>
  );
}
