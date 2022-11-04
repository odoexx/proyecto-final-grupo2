import { Navbar, Nav, Container } from "react-bootstrap";
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
              <Link className="link" to="/juego">
                Jugar
              </Link>
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
      <div id='game'>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default BarraNav;
