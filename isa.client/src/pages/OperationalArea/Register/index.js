import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { createOperationalAreaRequest } from '~/store/modules/operationalArea/actions';

const schema = Yup.object().shape({
  title: Yup.string().required('O campo Nome é obrigatório.'),
});

export default function OperationalAreaRegister() {
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(createOperationalAreaRequest(data));
  }

  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit} className="mt-5">
        <h3>Nova Área Operacional</h3>
        <div className="row-cols mt-3">
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
