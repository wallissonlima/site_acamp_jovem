import React, { useState } from "react";
import { Context, Logo } from "./styles";
import logo from "../../assets/logo1.png";
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
import { Link, useLocation } from "react-router-dom";

export const Header: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // 🔹 Função para scroll suave
  const scrollToSection = (id: string) => {
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
                Acampa Jovem
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
            <User size={25} style={{ padding: 1 }} />
            <Link style={{ color: "#9b59b6" }} to="/carrinho">
              <ShoppingCart size={25} style={{ padding: 1 }} />
            </Link>
          </div>
        </Collapse>
      </Navbar>
    </Context>
  );
};
