import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { createEquipmentTypeRequest } from '~/store/modules/equipmentType/actions';

const schema = Yup.object().shape({
  title: Yup.string().required('O campo Nome é obrigatório.'),
});

export default function EquipmentTypeRegister() {
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(createEquipmentTypeRequest(data));
  }

  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit} className="mt-5">
        <h3>Novo Tipo de Equipamento</h3>
        <div className="row-cols mt-3">
          <Input
            className="form-control"
            name="title"
            type="text"
            placeholder="Nome do Tipo de Equipamento"
          />
          <hr />
          <section className="row d-flex justify-content-end">
            <div className="col-1">
              <Link to="/type" type="submit" className="btn btn-secondary">
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
