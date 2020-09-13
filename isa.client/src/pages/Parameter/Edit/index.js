import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Input, Form } from '@rocketseat/unform';
import { updateParameterRequest } from '~/store/modules/parameter/actions';
import api from '~/services/api';

const schema = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string().required('O campo Nome é obrigatório.'),
  price: Yup.number().required('O valor do parâmetro é obrigatório.'),
});

export default function ParameterEdit(props) {
  const [parameter, setParameter] = useState([]);

  useEffect(() => {
    async function loadArea() {
      const { id } = props.match.params;
      const response = await api.get(`/parameter/edit/${id}`);
      const data = response.data.parameter;
      setParameter(data);
    }
    loadArea();
  }, []);

  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateParameterRequest(data));
  }

  return (
    <>
      <Form
        schema={schema}
        onSubmit={handleSubmit}
        initialData={parameter}
        className="mt-5"
      >
        <h3>Editar Parâmetro</h3>
        <div className="row-cols mt-3">
          <Input className="form-control" name="id" type="hidden" />
          <p> Nome: </p>
          <Input
            className="form-control"
            name="name"
            type="text"
            placeholder="Nome do parâmetro"
          />
          <p> Valor: </p>
          <Input
            className="form-control"
            name="price"
            type="text"
            placeholder="Valor do parâmetro"
          />
          <hr />
          <section className="row d-flex justify-content-end">
            <div className="col-1">
              <Link to="/parameter" type="submit" className="btn btn-secondary">
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
