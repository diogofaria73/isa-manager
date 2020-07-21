import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/home">ISA Manager</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Relatórios" id="collasible-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/dashboard">Análise de Equipamentos</Link>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Cadastros" id="collasible-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/area">Áreas Operacionais</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/equipment">Equipamentos</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/type">Tipos</Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link>
            <Link to="/profile">Perfil</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
