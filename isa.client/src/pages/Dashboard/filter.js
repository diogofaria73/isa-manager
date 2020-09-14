import React , { useEffect, useState } from 'react';
import api from '../../services/api';
import { BsSearch } from 'react-icons/bs';
import { Form, Input, Select } from '@rocketseat/unform';

export default function DashboardFilter () {
  const [equipments, setEquipments] = useState([]);
  const [areas, setAreas] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    async function loadEquipments() {
      const response = await api.get('equipment');
      const data = response.data.equipmentList;
      setEquipments(data);
    }
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
    loadEquipments();
  }, []);

  // TODO - Ajustar método para pegar o valor do select de tipo de equipamento também.
  function changeOperacionalArea(event) {
    const area_id = event.target.value;
    const data = {
      operational_area_id: area_id,
    }
    async function loadEquipmentsByArea() {
      const response = await api.post('equipment/findByAreaAndType', data);
      const list = response.data.equipmentList;
      setEquipments(list);
    }
    loadEquipmentsByArea();
  }

  // handleSubmit(event) {
  // alert('xxxxxxx: ' + this.state.value);
  // event.preventDefault();
  // }

  return (
    <Form className="mt-5">
      <div className="row">
        <div className="col">
          <label>Áreas Operacionais: </label>
          <select className="form-control" onChange={changeOperacionalArea}>
            <option value="0">Todos</option>
            {areas.map((area) => (
              <option value={area.id}>{area.title}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <label>Tipos de Equipamentos: </label>
          <select className="form-control">
            <option value="0">Todos</option>
            {types.map((type) => (
              <option value={type.id}>{type.title}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <label>Equipamentos: </label>
          <select className="form-control">
            <option value="0">Todos</option>
            {equipments.map((equipment) => (
              <option value={equipment.id}>{equipment.tag}</option>
            ))}
          </select>
        </div>

      </div>
      <div className="row mt-3 align-items-center">
        <div className="col">
          <label>Data Inicial:</label>
          <Input
            className="form-control"
            name="start_date"
            type="text"
            placeholder="Data Inicial"
          />
        </div>
        <div className="col">
          <label>Data Final:</label>
          <Input
            className="form-control"
            name="end_date"
            type="text"
            placeholder="Data Inicial"
          />
        </div>
        <div className="col">
          <div className="btn-group">
            <button type="button" className="btn btn-secondary btn-sm">
              <BsSearch size={12} color="#FFF" /> Buscar
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
}
