import { SignOut } from "phosphor-react";
import {
  Container,
  Sidebar,
  Title,
  Button,
  ButtonDanger,
  PageArea,
} from "./styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Outlet } from "react-router-dom"

export function DashboardAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("admin");

    navigate("/admin/login", { replace: true });
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const admin = localStorage.getItem("admin");

    if (!token || !admin) {
      navigate("/admin/login", { replace: true });
      return;
    }

    if (location.pathname === "/admin") {
      navigate("/admin/home", { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    window.onpopstate = function () {
      const token = localStorage.getItem("access_token");
      const admin = localStorage.getItem("admin");

      if (!token || !admin) {
        navigate("/admin/login", { replace: true });
      }
    };
  }, [navigate]);

  return (
    <Container>
      <Sidebar>
        <Title>Painel Admin</Title>

        <Button
          active={location.pathname === "/admin/config"}
          onClick={() => navigate("/admin/config")}
        >
          Carousel
        </Button>

        <Button
          active={location.pathname === "/admin/home"}
          onClick={() => navigate("/admin/home")}
        >
          Editar Seção - Acampa
        </Button>

        <Button
          active={location.pathname === "/admin/cronograma"}
          onClick={() => navigate("/admin/cronograma")}
        >
          Cronogramas
        </Button>

        <Button
          active={location.pathname === "/admin/eventos"}
          onClick={() => navigate("/admin/eventos")}
        >
          Eventos
        </Button>

        <Button
          active={location.pathname === "/admin/depoimentos"}
          onClick={() => navigate("/admin/depoimentos")}
        >
          Depoimentos
        </Button>

        <Button
          active={location.pathname === "/admin/configInscricoes"}
          onClick={() => navigate("/admin/configInscricoes")}
        >
          Configuração inscrições
        </Button>

        <Button
          active={location.pathname === "/admin/exports"}
          onClick={() => navigate("/admin/exports")}
        >
          Exporta participantes
        </Button>

        <Button
          active={location.pathname === "/admin/exportsServos"}
          onClick={() => navigate("/admin/exportsServos")}
        >
          Exporta servos
        </Button>

        <ButtonDanger onClick={handleLogout}>
          <SignOut size={15} /> Sair
        </ButtonDanger>
      </Sidebar>

      <PageArea><Outlet /></PageArea>
    </Container>
  );
}