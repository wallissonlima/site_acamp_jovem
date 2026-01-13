import React, { useState } from "react";
import { Context, Logo } from "./styles";
import logo from "../../assets/log1.png";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { ShoppingCart, User } from "phosphor-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // 🔹 Função para scroll suave
  const scrollToSection = (id: string) => {
    // Se NÃO estiver na home → ir para a home antes
    if (location.pathname !== "/home") {
      navigate("/home");

      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300); // tempo para a /home carregar

      return;
    }

    // Se já estiver na /home, apenas scrolla
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <Context>
      <Navbar light expand="md" className="navbar-container">
        <NavbarBrand href="/home" className="logo-container">
          <Logo src={logo} alt="Logo" />
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink
                tag={Link}
                to="/home"
                className={location.pathname === "/home" ? "active" : ""}
              >
                Inicio
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink onClick={() => scrollToSection("eventos")}>
                Eventos
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink onClick={() => scrollToSection("acampajovem")}>
                Incrições
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink onClick={() => scrollToSection("depoimentos")}>
                Depoimentos
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                tag={Link}
                to="/cronograma"
                className={location.pathname === "/cronograma" ? "active" : ""}
              >
                Cronograma
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                tag={Link}
                to="/contato"
                className={location.pathname === "/contato" ? "active" : ""}
              >
                Contato
              </NavLink>
            </NavItem>
          </Nav>

          <div className="icon-container">
            <Link to="/admin/login">
              <User size={25} style={{ padding: 1, color: "#9b59b6" }} />
            </Link>
            {/* <Link style={{ color: "#9b59b6" }} to="/carrinho">
              <ShoppingCart size={25} style={{ padding: 1 }} />
            </Link> */}
          </div>
        </Collapse>
      </Navbar>
    </Context>
  );
};
