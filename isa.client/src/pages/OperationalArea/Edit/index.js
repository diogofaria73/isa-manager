import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Input, Form } from '@rocketseat/unform';
import { updateOperationalAreaRequest } from '~/store/modules/operationalArea/actions';
import api from '~/services/api';

const schema = Yup.object().shape({
  id: Yup.number(),
  title: Yup.string().required('O campo Nome é obrigatório.'),
});

export default function OperationalAreaRegister(props) {
  const [area, setArea] = useState([]);

  useEffect(() => {
    async function loadArea() {
      const {id} = props.match.params;
      const response = await api.get(`/operationalArea/edit/${id}`);
      const data = response.data.area;
      setArea(data);
    }
    loadArea();
  }, []);

  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateOperationalAreaRequest(data));
  }

  return (
    <>
      <Form
        schema={schema}
        onSubmit={handleSubmit}
        initialData={area}
        className="mt-5"
      >
        <h3>Editar Área Operacional</h3>
        <div className="row-cols mt-3">
          <Input className="form-control" name="id" type="hidden" />
          <Input
            className="form-control"
            name="title"
            type="text"
            placeholder="Nome da Área Operacional"
          />
          <hr />
          <section className="row d-flex justify-content-end">
            <div className="col-1">
              <Link to="/area" type="submit" className="btn btn-secondary">
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
