import React, { Component } from "react";
import ActionCreators from "./../../redux/actionCreators";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Table, Button, Segment } from "semantic-ui-react";

class Users extends Component {
  componentDidMount() {
    this.props.load();
  }

  renderUser = user => {
    return (
      <Table.Row key={user.id}>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>{user.role}</Table.Cell>
        <Table.Cell>
          <Button
            basic
            as={Link}
            to={`/admin/users/${user.id}/edit`}
            color="blue"
          >
            editar
          </Button>
          <Button basic color="red" onClick={() => this.props.remove(user.id)}>
            remover
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  render() {
    return (
      <div>
        <h1>Lista de Usuários</h1>
        {this.props.users.isLoading && <p>Carregando...</p>}
        {!this.props.users.isLoading && this.props.users.data.length === 0 && (
          <Segment color="yellow">Nenhum usuário cadastrado!</Segment>
        )}
        {!this.props.users.isLoading && this.props.users.data.length > 0 && (
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>E-mail</Table.HeaderCell>
                <Table.HeaderCell>Tipo</Table.HeaderCell>
                <Table.HeaderCell>Ações</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.users.data.map(this.renderUser)}
            </Table.Body>
          </Table>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    runs: state.runs,
    auth: state.auth,
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    load: () => dispatch(ActionCreators.getUsersRequest()),
    remove: id => dispatch(ActionCreators.removeUserRequest(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
