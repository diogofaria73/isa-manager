import React from 'react';
import api from '../../services/api';
import { BsSearch } from 'react-icons/bs';
import { Input } from '@rocketseat/unform';

class DashboardFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    operationalAreas: [],
    equipmentTypes: [],
    equipments:[],
  };

  async componentDidMount() {
    var response = await api.get('dashboard');

    var data = response.data.operationalAreaList.map((operationalArea) => ({
      ...operationalArea,
    }));

    this.setState({ operationalAreas: data });

    data = response.data.equipmentTypeList.map((equipmentType) => ({
      ...equipmentType,
    }));

    this.setState({ equipmentTypes: data });

    data = response.data.equipmentList.map((equipmentType) => ({
      ...equipmentType,
    }));

    this.setState({ equipments: data });

  }

  handleChange(event) {
    // this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // alert('xxxxxxx: ' + this.state.value);
    // event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className=".form-control">
        <div className="row">
          <div className="col">
            <label>Áreas Operacionais: </label>
            <select value={this.state.value} onChange={this.handleChange} class="form-control">
              <option value="0">Todos</option>
              { this.state.operationalAreas.map((operationalArea) => (
                <option value={operationalArea.id}>{operationalArea.title}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <label>Tipos de Equipamentos: </label>
            <select value={this.state.value} onChange={this.handleChange} class="form-control">
              <option value="0">Todos</option>
              { this.state.equipmentTypes.map((equipmentType) => (
                <option value={equipmentType.id}>{equipmentType.title}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <label>Equipamentos: </label>
            <select value={this.state.value} onChange={this.handleChange} class="form-control">
              <option value="0">Todos</option>
              { this.state.equipments.map((equipment) => (
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
      </form>
    );
  }
}

export default DashboardFilter;
