import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Input, Form } from '@rocketseat/unform';
import { updateEquipmentTypeRequest } from '~/store/modules/equipmentType/actions';
import api from '~/services/api';

const schema = Yup.object().shape({
  id: Yup.number(),
  title: Yup.string().required('O campo Nome é obrigatório.'),
});

export default function EquipmentTypeEdit(props) {
  const [equipmentType, setEquipmentType] = useState([]);

  useEffect(() => {
    async function loadEquipmentType() {
      const { id } = props.match.params;
      const response = await api.get(`/equipmentType/edit/${id}`);
      const data = response.data.equipmentType;
      setEquipmentType(data);
    }
    loadEquipmentType();
  }, [props.match.params]);

  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateEquipmentTypeRequest(data));
  }

  return (
    <>
      <Form
        schema={schema}
        onSubmit={handleSubmit}
        initialData={equipmentType}
        className="mt-5"
      >
        <h3>Editar Tipo de Equipamento</h3>
        <div className="row-cols mt-3">
          <Input className="form-control" name="id" type="hidden" />
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
