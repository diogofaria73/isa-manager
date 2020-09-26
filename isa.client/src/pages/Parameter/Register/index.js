import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { createParameterRequest } from '~/store/modules/parameter/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O campo Nome é obrigatório.'),
  price: Yup.number().required('O valor do parâmetro é obrigatório'),
});

export default function OperationalAreaRegister() {
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(createParameterRequest(data));
  }

  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit} className="mt-5">
        <h3>Novo Parâmetro</h3>
        <div className="row-cols mt-3">
          <Input
            className="form-control"
            name="name"
            type="text"
            placeholder="Parâmetro"
          />
          <Input
            className="form-control mt-3"
            name="price"
            type="text"
            placeholder="Valor"
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
