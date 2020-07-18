import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { Container, Content, Profile } from './style';

export default function Header() {
  const deafultAvatar = 'https://api.adorable.io/avatars/60/abott@adorable.png';
  return (
    <Container>
      <Content>
        <Nav>
          <Nav.Item>
            <Nav.Link>
              <Link to="/home">Home</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/dashboard">Dashboard</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/equipment">Equipamentos</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/equipmentType">Tipos de Equipamentos</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/operationalArea">Area Operacional</Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <aside>
          <Profile>
            <div>
              <strong>Diogo Faria</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img src={deafultAvatar} alt="Minha Foto" />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
