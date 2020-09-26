import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Input, Form } from '@rocketseat/unform';
import { deleteUserRequest } from '~/store/modules/user/actions';
import api from '~/services/api';

const schema = Yup.object().shape({
  id: Yup.number(),
});

export default function UserDelete(props) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function loadUser() {
      const { id } = props.match.params;
      const response = await api.get(`/user/edit/${id}`);
      const data = response.data.user;
      setUser(data);
    }
    loadUser();
  }, []);

  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(deleteUserRequest(data.id));
  }

  return (
    <>
      <Form
        schema={schema}
        onSubmit={handleSubmit}
        initialData={user}
        className="mt-5"
      >
        <h3>Excluir Usuário</h3>
        <div className="row-cols mt-3">
          <Input className="form-control" name="id" type="hidden" />
          <p>Nome:</p>
          <Input
            className="form-control"
            name="name"
            type="text"
            placeholder="Nome do Parâmetro"
            disabled
          />
          <p>Email:</p>
          <Input
            className="form-control"
            name="email"
            type="text"
            placeholder="Valor do Parâmetro"
            disabled
          />
          <hr />
          <section className="row d-flex justify-content-end">
            <div className="col-1">
              <Link to="/user" type="submit" className="btn btn-secondary">
                Voltar
              </Link>
            </div>
            <div className="col-1">
              <button type="submit" className="btn btn-danger">
                Excluir
              </button>
            </div>
          </section>
        </div>
      </Form>
    </>
  );
}
