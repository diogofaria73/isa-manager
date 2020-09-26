import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Input, Form } from '@rocketseat/unform';
import { deleteOperationalAreaRequest } from '~/store/modules/operationalArea/actions';
import api from '~/services/api';

const schema = Yup.object().shape({
  id: Yup.number(),
});

export default function OperationalAreaDelete(props) {
  const [area, setArea] = useState([]);

  useEffect(() => {
    async function loadArea() {
      const { id } = props.match.params;
      const response = await api.get(`/operationalArea/edit/${id}`);
      const data = response.data.area;
      setArea(data);
    }
    loadArea();
  }, [props.match.params]);

  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(deleteOperationalAreaRequest(data.id));
  }

  return (
    <>
      <Form
        schema={schema}
        onSubmit={handleSubmit}
        initialData={area}
        className="mt-5"
      >
        <h3>Excluir Área Operacional</h3>
        <div className="row-cols mt-3">
          <Input className="form-control" name="id" type="hidden" />
          <Input
            className="form-control"
            name="title"
            type="text"
            placeholder="Nome da Área Operacional"
            disabled
          />
          <hr />
          <section className="row d-flex justify-content-end">
            <div className="col-1">
              <Link to="/area" type="submit" className="btn btn-secondary">
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
