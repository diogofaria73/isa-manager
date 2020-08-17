import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { updateOperationalAreaRequest } from '~/store/modules/operationalArea/actions';
import api from '~/services/api';

const schema = Yup.object().shape({
  title: Yup.string().required('O campo Nome é obrigatório.'),
});

export default function OperationalAreaEdit() {
  const dispatch = useDispatch();

  const [initialData, setData] = useState([]);

  useEffect(() => {
    async function loadArea() {
      const response = await api.get('/operationalArea/edit/1');
      const data = response.data.area;
      setData(data);
    }
    loadArea();
  }, []);

  function handleSubmit(data) {
    dispatch(updateOperationalAreaRequest(data));
  }

  return (
    <>
      <Form
        schema={schema}
        onSubmit={handleSubmit}
        initialData={initialData}
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
