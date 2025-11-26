import { Container, Sidebar, Title, Button, ButtonDanger, PageArea } from "./styles";
import { useNavigate } from "react-router-dom";

export function DashboardAdmin({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/admin/login");
  }

  return (
    <Container>

      {/* SIDEBAR */}
      <Sidebar>
        <Title>Painel Admin</Title>

        <Button onClick={() => navigate("/admin/home")}>
          📊 Home
        </Button>
        <Button onClick={() => navigate("/admin/cronograma")}>
          🗓 Cronogramas
        </Button>
        <Button onClick={() => navigate("/admin/eventos")}>
          📅 Eventos
        </Button>
        <Button onClick={() => navigate("/admin/config")}>
          ⚙ Configurações
        </Button>

        <ButtonDanger onClick={handleLogout}>🚪 Sair</ButtonDanger>
      </Sidebar>


      <PageArea>
        {children}
      </PageArea>

    </Container>
  );
}
