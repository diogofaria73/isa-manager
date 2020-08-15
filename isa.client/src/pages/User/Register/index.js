import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { createUserRequest } from '~/store/modules/user/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O campo Nome é obrigatório.'),
  email: Yup.string().email().required('O campo email é obrigatório'),
  password: Yup.string().required('O campo Senha é obrigatório').min(6),
  is_admin: Yup.boolean().required('O campo de Administrador é obrigatório'),
});

export default function UserRegister() {
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(createUserRequest(data));
  }

  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit} className="mt-5">
        <h3>Novo Usuário</h3>
        <div className="row-cols mt-3">
          <Input
            className="form-control"
            name="name"
            type="text"
            placeholder="Nome do Usuário"
          />
          <Input
            className="form-control mt-3"
            name="email"
            type="email"
            placeholder="E-mail"
          />
          <Input
            className="form-control mt-3"
            name="password"
            type="password"
            placeholder="Senha"
          />
          <Input
            className="form-control mt-3"
            name="is_admin"
            type="text"
            placeholder="Administrador"
          />
          <hr />
          <section className="row d-flex justify-content-end">
            <div className="col-1">
              <Link to="/user" type="submit" className="btn btn-secondary">
                Voltar
              </Link>
            </div>
            <div className="col-1">
              <button type="submit" className="btn btn-secondary">
                Salvar
              </button>
            </div>
          </section>
        </div>
      </Form>
    </>
  );
}
