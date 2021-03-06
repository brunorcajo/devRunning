import React, { Component } from "react";
import ActionCreators from "./../../redux/actionCreators";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Table, Button, Segment } from "semantic-ui-react";

import Duration from "../elements/Duration";
import Distance from "../elements/Distance";
import DateStr from "../elements/DateStr";

class Runs extends Component {
  componentDidMount() {
    this.props.load();
  }

  renderRun = run => {
    return (
      <Table.Row key={run.id}>
        <Table.Cell>{run.friendly_name}</Table.Cell>
        <Table.Cell>
          <Duration duration={run.duration} />
        </Table.Cell>
        <Table.Cell>
          <Distance
            distance={run.distance}
            metric={this.props.auth.user.unit}
          />
        </Table.Cell>
        <Table.Cell>
          <DateStr
            date={run.created}
            timezone={this.props.auth.user.timezone}
          />
        </Table.Cell>
        <Table.Cell>
          <Button basic color="red" onClick={() => this.props.remove(run.id)}>
            remover
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  render() {
    return (
      <div>
        <h1>Corridas</h1>
        <Button as={Link} to="/restrito/create-run">
          Nova corrida
        </Button>
        {this.props.runs.isLoading && <p>Carregando...</p>}
        {!this.props.runs.isLoading && this.props.runs.data.length === 0 && (
          <Segment color="yellow">Nenhuma corrida cadastrada!</Segment>
        )}
        {!this.props.runs.isLoading && this.props.runs.data.length > 0 && (
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Duração</Table.HeaderCell>
                <Table.HeaderCell>Distancia</Table.HeaderCell>
                <Table.HeaderCell>Data</Table.HeaderCell>
                <Table.HeaderCell>Ações</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{this.props.runs.data.map(this.renderRun)}</Table.Body>
          </Table>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    runs: state.runs,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    load: () => dispatch(ActionCreators.getRunsRequest(false)),
    create: run => dispatch(ActionCreators.createRunRequest(run)),
    remove: id => dispatch(ActionCreators.removeRunRequest(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Runs);
