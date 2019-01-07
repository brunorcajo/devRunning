import React, { Component } from "react";
import ActionCreators from "../redux/actionCreators";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import timezones from "moment-timezone/data/meta/latest.json";
import { Button, Segment, Form } from "semantic-ui-react";

import Header from "../Header";

class CreateAccount extends Component {
  //Controled component

  state = {
    passwd: "",
    passwd2: "",
    name: "",
    email: "",
    unit: "metric",
    timezone: "America/Sao_Paulo",
    error: ""
  };

  componentDidMount() {
    this.props.reset();
  }

  handleChange = fieldname => event => {
    this.setState({
      [fieldname]: event.target.value
    });
  };

  handleSave = () => {
    if (this.state.passwd !== this.state.passwd2) {
      this.setState({
        error: "equal"
      });
    } else if (this.state.passwd.length < 6) {
      this.setState({
        error: "lenght"
      });
    } else {
      this.setState({
        error: ""
      });
      this.props.save({
        name: this.state.name,
        email: this.state.email,
        unit: this.state.unit,
        timezone: this.state.timezone,
        passwd: this.state.passwd
      });
    }
  };

  render() {
    if (this.props.auth.isAuth) {
      return <Redirect to="/restrito" />;
    }
    return (
      <React.Fragment>
        <Header />
        <h1>Criar conta</h1>
        {this.props.auth.error && (
          <Segment color="red">{this.props.auth.error.message}</Segment>
        )}
        {this.state.error === "equal" && (
          <Segment color="red">Senha e confirmação devem ser iguais!</Segment>
        )}
        {this.state.error === "lenght" && (
          <Segment color="red">A senha deve ter mais de 6 caracteres!</Segment>
        )}
        {this.props.auth.saved && (
          <Segment color="green">Conta criada com sucesso!</Segment>
        )}
        {!this.props.auth.saved && (
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
              <label>Unidade</label>
              <select
                value={this.state.unit}
                onChange={this.handleChange("unit")}
              >
                <option value="metric">Métrico (km)</option>
                <option value="imperial">Imperial (mi)</option>
              </select>
            </Form.Field>
            <Form.Field>
              <label>Timezone</label>
              <select
                value={this.state.timezone}
                onChange={this.handleChange("timezone")}
              >
                {Object.keys(timezones.zones).map(tz => {
                  return (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  );
                })}
              </select>
            </Form.Field>
            <Form.Field>
              <label>Senha</label>
              <input
                type="password"
                value={this.state.passwd}
                onChange={this.handleChange("passwd")}
              />
            </Form.Field>
            <Form.Field>
              <label>Confirmar senha</label>
              <input
                type="password"
                value={this.state.passwd2}
                onChange={this.handleChange("passwd2")}
              />
            </Form.Field>
            <Button onClick={this.handleSave}>Criar conta</Button>
          </Form>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    save: user => dispatch(ActionCreators.createProfileRequest(user)),
    reset: () => dispatch(ActionCreators.createProfileReset())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccount);
