import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Form } from '@rocketseat/unform';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../services/api';

registerLocale('pt-BR', ptBR);

export default function DashboardFilter() {
  const [equipments, setEquipments] = useState([]);
  const [areas, setAreas] = useState([]);
  const [types, setTypes] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selStatus, setSelStatus] = useState([]);

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
    const selData = {
      operational_area_id: '0',
      equipment_type_id: '0',
    }
    setSelStatus(selData);
  }, []);

  function changeOperacionalArea(e) {
    const data = {
      operational_area_id: e.target.value,
      equipment_type_id: selStatus.equipment_type_id,
    };
    setSelStatus(data);
    async function loadEquipmentsByArea() {
      const response = await api.post('equipment/findByAreaAndType', data);
      const list = response.data.equipmentList;
      setEquipments(list);
    }
    loadEquipmentsByArea();
  }

  function changeEquipmentType(e) {
    const data = {
      operational_area_id: selStatus.operational_area_id,
      equipment_type_id: e.target.value,
    };
    setSelStatus(data);
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
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h6>Áreas Operacionais: </h6>
              <select className="form-control" onChange={changeOperacionalArea}>
                <option value="0">Todos</option>
                {areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <h6>Tipos de Equipamentos: </h6>
              <select className="form-control" onChange={changeEquipmentType}>
                <option value="0">Todos</option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <h6>Equipamentos: </h6>
              <select className="form-control">
                <option value="0">Todos</option>
                {equipments.map((equipment) => (
                  <option key={equipment.id} value={equipment.id}>
                    {equipment.tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mt-3 align-items-center">
            <div className="col">
              <h6>Data Inicial:</h6>
              <DatePicker
                className="form-control"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                locale="pt-BR"
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="col">
              <h6>Data Final:</h6>
              <DatePicker
                className="form-control"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                locale="pt-BR"
                dateFormat="dd/MM/yyyy"
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
        </div>
      </div>
    </Form>
  );
}
