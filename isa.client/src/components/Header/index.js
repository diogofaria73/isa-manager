import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

export default function Header() {
  // const deafultAvatar = 'https://api.adorable.io/avatars/60/abott@adorable.png';
  return (
    <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/home">ISA Manager</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Dashboards" id="collasible-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/operationalArea">Análise de Equipamentos</Link>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Cadastros" id="collasible-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/operationalArea">Áreas Operacionais</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/equipment">Equipamentos</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/equipmentType">Tipos</Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link>
            <Link to="/perfil">Perfil</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
