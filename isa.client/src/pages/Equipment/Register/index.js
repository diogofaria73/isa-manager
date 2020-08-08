import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Select } from '@rocketseat/unform';
import { BsFillPlusCircleFill } from 'react-icons/bs';

export default function EquipmentRegister() {
  // const dispatch = useDispatch();

  function handleSubmit() {
    alert('Salvando Equipamento');
  }

  return (
    <>
      <Form
        // schema={schema}
        onSubmit={handleSubmit}
        className="mt-5"
      >
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
          <Input
            className="form-control mt-3"
            name="equipment_type_id"
            type="text"
            placeholder="Tipo do Equipamento"
          />
          <Input
            className="form-control mt-3"
            name="operational_area_id"
            type="text"
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
