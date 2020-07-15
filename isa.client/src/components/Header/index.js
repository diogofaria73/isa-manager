import React from 'react';
import { Container, Content, Profile } from './style';
import logo from '../../assets/nuxt.svg';

export default function Header() {
  const deafultAvatar = 'https://api.adorable.io/avatars/60/abott@adorable.png';
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Exemplo de Logo" />
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>Diogo</strong>
            </div>
            <img src={deafultAvatar} alt="Minha Foto" />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
