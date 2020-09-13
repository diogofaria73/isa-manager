import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Input, Form } from '@rocketseat/unform';
import { deleteEquipmentTypeRequest } from '~/store/modules/equipmentType/actions';
import api from '~/services/api';

const schema = Yup.object().shape({
  id: Yup.number(),
});

export default function OperationalAreaDelete(props) {
  const [equipmentType, setEquipmentType] = useState([]);

  useEffect(() => {
    async function loadEquipmentType() {
      const { id } = props.match.params;
      const response = await api.get(`/equipmentType/edit/${id}`);
      const data = response.data.equipmentType;
      setEquipmentType(data);
    }
    loadEquipmentType();
  }, []);

  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(deleteEquipmentTypeRequest(data.id));
  }

  return (
    <>
      <Form
        schema={schema}
        onSubmit={handleSubmit}
        initialData={equipmentType}
        className="mt-5"
      >
        <h3>Excluir Tipo de Equipamento</h3>
        <div className="row-cols mt-3">
          <Input className="form-control" name="id" type="hidden" />
          <Input
            className="form-control"
            name="title"
            type="text"
            placeholder="Nome do Tipo de Equipamento"
            disabled
          />
          <hr />
          <section className="row d-flex justify-content-end">
            <div className="col-1">
              <Link to="/type" type="submit" className="btn btn-secondary">
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
