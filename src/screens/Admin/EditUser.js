import React, { Component } from "react";
import ActionCreators from "../../redux/actionCreators";
import { connect } from "react-redux";

import { Button, Form, Segment } from "semantic-ui-react";
import "input-moment/dist/input-moment.css";

class EditUser extends Component {
  //Controled component

  state = {
    name: "",
    email: "",
    role: "",
    error: ""
  };

  componentDidMount() {
    this.props.load(this.props.match.params.id);
  }

  static getDerivedStateFromProps(newProps, prevState) {
    if (
      newProps.users &&
      newProps.users.user &&
      (prevState.name === undefined || prevState.name === "")
    ) {
      const user = {};
      const u = newProps.users.user;

      if (u.name !== prevState.name) {
        user.name = u.name;
      }

      if (u.email !== prevState.email) {
        user.email = u.email;
      }

      if (u.role !== prevState.role) {
        user.role = u.role;
      }

      return user;
    }
    return null;
  }

  handleChange = fieldname => event => {
    this.setState({
      [fieldname]: event.target.value
    });
  };

  handleSave = () => {
    this.props.save({
      id: this.props.match.params.id,
      name: this.state.name,
      email: this.state.email,
      role: this.state.role
    });

    //redirect
    setTimeout(() => {
      this.props.history.push("/admin/users");
    }, 3000);
  };

  render() {
    return (
      <div>
        <h1>Editar Usuário</h1>
        {this.props.users.saved && (
          <Segment color="green">Usuário alterado com sucesso.</Segment>
        )}
        {!this.props.users.saved && (
          <Form>
            <Form.Field>
              <label>Nome</label>
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleChange("name")}
              />
            </Form.Field>
            <Form.Field>
              <label>E-mail</label>
              <input
                type="email"
                value={this.state.email}
                onChange={this.handleChange("email")}
              />
            </Form.Field>
            <Form.Field>
              <label>Role</label>
              <select
                value={this.state.role}
                onChange={this.handleChange("role")}
              >
                <option value="admin">Admnistrador</option>
                <option value="user">Usuário</option>
              </select>
            </Form.Field>

            <Button onClick={this.handleSave}>Salvar usuário</Button>
          </Form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    save: user => dispatch(ActionCreators.updateUserRequest(user)),
    reset: () => dispatch(ActionCreators.updateUserReset()),
    load: id => dispatch(ActionCreators.getUserRequest(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
