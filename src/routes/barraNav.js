import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import React from "react";
import "./barraNav.css";

const BarraNav = () => {
  return (
    <>
      <Navbar className="navBg" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Grupo 2</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="link" to="/">
                Inicio
              </Link>

              <NavDropdown
                title="Juegos"
                className="navDrop"
                id="basic-nav-dropdown"
              >
                <Link className="dropDown" to="/PPT">
                  PiedraPapelTijeras
                </Link>
                <NavDropdown.Divider />
                <Link className="dropDown" to="/ahorcadito">
                  Ahorcadito
                </Link>
                <NavDropdown.Divider />
                <Link className="dropDown" to="/arkanoid">
                  Arkanoid
                </Link>
                <NavDropdown.Divider />
                <Link className="dropDown" to="/memotest">
                  Memotest
                </Link>
                <NavDropdown.Divider />
                <Link className="dropDown" to="/geometrydash">
                  Geometry Dash
                </Link>
              </NavDropdown>

              <Link className="link" to="/integrantes">
                Integrantes
              </Link>
              <Link className="link" to="/despedida">
                Salir
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Usamos el mismo id al cual hicimos referencia en la propiedad "parent" en phaser para redirigir la ventana de phaser a este punto*/}
      <div id="game">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default BarraNav;
