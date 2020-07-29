import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { signInRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/prismic.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve possuir no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function SingIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <div className="align-content-center container align-items-center mt-5">
      <div className="row-cols-2">
        <img src={logo} alt="ISA Engenharia" className="offset-auto" />
      </div>
      <Form schema={schema} onSubmit={handleSubmit} className="mt-5">
        <div className="row-cols-2">
          <Input
            className="form-control"
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
          />
          <Input
            className="form-control mt-3"
            name="password"
            type="password"
            placeholder="Digite sua senha"
          />
          <button
            className="btn btn-secondary mt-3 align-items-end"
            type="submit"
          >
            {loading ? 'Carregando...' : 'Acessar'}
          </button>
        </div>
      </Form>
    </div>
  );
}
