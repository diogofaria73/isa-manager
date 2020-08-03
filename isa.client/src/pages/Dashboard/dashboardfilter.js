import React from 'react';
import api from '../../services/api';

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
    var response = await api.get('operationalArea');

    var data = response.data.operationalAreaList.map((operationalArea) => ({
      ...operationalArea,
    }));

    this.setState({ operationalAreas: data });

    response = await api.get('equipmentType');

    data = response.data.equipmentTypesList.map((equipmentType) => ({
      ...equipmentType,
    }));

    this.setState({ equipmentTypes: data });

    response = await api.get('equipment');

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
                <option value={operationalArea.id}>{operationalArea.name}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <label>Tipos de Equipamentos: </label>
            <select value={this.state.value} onChange={this.handleChange} class="form-control">
              <option value="0">Todos</option>
              { this.state.equipmentTypes.map((equipmentType) => (
                <option value={equipmentType.id}>{equipmentType.name}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <label>Equipamentos: </label>
            <select value={this.state.value} onChange={this.handleChange} class="form-control">
              <option value="0">Todos</option>
              { this.state.equipments.map((equipment) => (
                <option value={equipment.id}>{equipment.name}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <input type="submit" value="Filtrar" />
          </div>
        </div>
      </form>
    );
  }
}

export default DashboardFilter;
