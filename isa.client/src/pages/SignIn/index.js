import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import logo from '../../assets/prismic.svg';

export default function SingIn() {
  return (
    <>
      <img src={logo} alt="ISA" />
      <Form>
        <Input name="email" type="email" placeholder="Digite seu e-mail" />
        <Input name="password" type="password" placeholder="Digite sua senha" />

        <button type="submit">Acessar</button>
      </Form>
    </>
  );
}
