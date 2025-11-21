import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Sidebar,
  Title,
  Button,
  ButtonDanger,
  MainContent
} from "./styles";

export function DashboardAdmin() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name?: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const adminInfo = localStorage.getItem("admin");
    console.log("Token:", token, "Admin Info:", adminInfo);
    if (!token || !adminInfo || adminInfo === "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("admin");
      navigate("/admin/login");
      return;
    }

    try {
      setUser(JSON.parse(adminInfo));
    } catch (err) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("admin");
      navigate("/admin/login");
    }
  }, []);


  function logout() {
    localStorage.removeItem("access_token"); // <- Corrigido
    localStorage.removeItem("admin");
    navigate("/admin/login");
  }


  return (
    <Container>
      {/* MENU LATERAL */}
      <Sidebar>
        <Title>Admin</Title>

        <Button onClick={() => navigate("/admin/dashboard")}>
          Inicio
        </Button>

        <Button onClick={() => navigate("/admin/content")}>
          Editar Textos
        </Button>

        <Button onClick={() => navigate("/admin/images")}>
          Gerenciar Imagens
        </Button>

        <ButtonDanger onClick={logout}>Sair</ButtonDanger>
      </Sidebar>

      {/* CONTEÚDO */}
      <MainContent>
        <h1>Bem-vindo, {user?.name}</h1>
        <p style={{ marginTop: "5px" }}>Área administrativa do site</p>
      </MainContent>
    </Container>
  );
}
