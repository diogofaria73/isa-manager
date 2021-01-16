import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Input, Form } from '@rocketseat/unform';
import { deleteParameterRequest } from '~/store/modules/parameter/actions';
import api from '~/services/api';

const schema = Yup.object().shape({
  id: Yup.number(),
});

export default function ParameterDelete(props) {
  const [parameter, setParameter] = useState([]);

  useEffect(() => {
    async function loadParameter() {
      const { id } = props.match.params;
      const response = await api.get(`/parameter/edit/${id}`);
      const data = response.data.parameter;
      setParameter(data);
    }
    loadParameter();
  }, [props.match.params]);

  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(deleteParameterRequest(data.id));
  }

  return (
    <>
      <Form
        schema={schema}
        onSubmit={handleSubmit}
        initialData={parameter}
        className="mt-5"
      >
        <h3>Excluir Parâmetro</h3>
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
          <p>Valor:</p>
          <Input
            className="form-control"
            name="price"
            type="text"
            placeholder="Valor do Parâmetro"
            disabled
          />
          <hr />
          <section className="row d-flex justify-content-end">
            <div className="col-1">
              <Link to="/parameter" type="submit" className="btn btn-secondary">
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
