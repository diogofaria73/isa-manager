import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input, Select } from '@rocketseat/unform';
import api from '~/services/api';
import { createEquipmentRequest } from '~/store/modules/equipment/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O Campo nome é obrigatório'),
  tag: Yup.string().required('O Campo TAG é obrigatório').min(3),
  equipment_type_id: Yup.number().required(
    'O Campo Tipo de Equipamento é obrigatório'
  ),
  operational_area_id: Yup.number().required(
    'O Campo Área Operacional é obrigatório'
  ),
  is_active: Yup.boolean().required(
    'O Campo de Status do Equipamento é obrigatório'
  ),
});

export default function EquipmentRegister() {
  const dispatch = useDispatch();
  const [areas, setAreas] = useState([]);
  const [types, setTypes] = useState([]);
  const [equipmentState, setEquipmentState] = useState([]);

  useEffect(() => {
    async function loadAreas() {
      const response = await api.get('operationalArea');
      const data = response.data.areas;
      setAreas(data);
    }
    async function loadTypes() {
      const response = await api.get('equipmentType');

      const data = response.data.types;
      setTypes(data);
    }
    loadAreas();
    loadTypes();
    const stateList = [
      { id: '1', title: 'Ativo' },
      { id: '0', title: 'Inativo' },
    ];
    setEquipmentState(stateList);
  }, []);

  function handleSubmit(data) {
    dispatch(createEquipmentRequest(data));
  }

  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit} className="mt-5">
        <h3>Novo Equipamento:</h3>
        <div className="row-cols mt-3">
          <Input
            className="form-control"
            name="name"
            type="text"
            placeholder="Nome do Equipamento"
          />
          <Input
            className="form-control mt-3"
            name="tag"
            type="text"
            placeholder="Tag de Identificação"
          />
          <Select
            className="form-control mt-3"
            name="equipment_type_id"
            options={types}
            placeholder="Tipo do Equipamento"
          />
          <Select
            className="form-control mt-3"
            name="operational_area_id"
            options={areas}
            placeholder="Área Operacional"
          />
          <Select
            className="form-control mt-3"
            name="is_active"
            options={equipmentState}
            placeholder="Status do Equipamento"
          />
          <hr />
          <section className="row d-flex justify-content-end">
            <div className="col-1">
              <Link to="/equipment" type="submit" className="btn btn-secondary">
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
