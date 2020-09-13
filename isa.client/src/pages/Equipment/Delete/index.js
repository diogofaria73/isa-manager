import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input, Select } from '@rocketseat/unform';
import api from '~/services/api';
import { deleteEquipmentRequest } from '~/store/modules/equipment/actions';

const schema = Yup.object().shape({
  id: Yup.number(),
});

export default function EquipmentDelete(props) {
  const dispatch = useDispatch();
  const [equipment, setEquipment] = useState([]);
  const [areas, setAreas] = useState([]);
  const [types, setTypes] = useState([]);
  const [equipmentState, setEquipmentState] = useState([])

  useEffect(() => {
    async function loadEquipment() {
      const { id } = props.match.params;
      const response = await api.get(`/equipment/edit/${id}`);
      const data = response.data.equipment;
      setEquipment(data);
    }
    loadEquipment();
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
    dispatch(deleteEquipmentRequest(data.id));
  }

  return (
    <>
      <Form
        schema={schema}
        onSubmit={handleSubmit}
        initialData={equipment}
        className="mt-5"
      >
        <h3>Excluir Equipamento:</h3>
        <div className="row-cols mt-3">
          <Input className="form-control" name="id" type="hidden" />
          <Input
            className="form-control"
            name="name"
            type="text"
            placeholder="Nome do Equipamento"
            disabled
          />
          <Input
            className="form-control mt-3"
            name="tag"
            type="text"
            placeholder="Tag de Identificação"
            disabled
          />
          <Select
            className="form-control mt-3"
            name="equipment_type_id"
            options={types}
            placeholder="Tipo do Equipamento"
            value={equipment.equipment_type_id}
            disabled
          />
          <Select
            className="form-control mt-3"
            name="operational_area_id"
            options={areas}
            placeholder="Área Operacional"
            value={equipment.operational_area_id}
            disabled
          />
          <Select
            className="form-control mt-3"
            name="is_active"
            placeholder="Status do Equipamento"
            options={equipmentState}
            value={equipment.is_active}
            disabled
          />
          <hr />
          <section className="row d-flex justify-content-end">
            <div className="col-1">
              <Link to="/equipment" type="submit" className="btn btn-secondary">
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
