import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input, Select } from '@rocketseat/unform';
import api from '~/services/api';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  tag: Yup.string().required().min(3),
  equipment_type_id: Yup.number().required(),
  operational_area_id: Yup.number().required(),
  is_active: Yup.boolean(),
});

export default function EquipmentRegister() {
  const [areas, setAreas] = useState([]);
  const [types, setTypes] = useState([]);

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
  }, []);

  function handleSubmit() {}

  return (
    <>
      <Form onSubmit={handleSubmit} className="mt-5">
        <h3>Novo Equipamento</h3>
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
          <Input
            className="form-control mt-3"
            name="isActive"
            type="text"
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
