import React, { Component } from "react";
import ActionCreators from "./../../redux/actionCreators";
import { connect } from "react-redux";

import { Button, Segment, Form } from "semantic-ui-react";

class ChangePass extends Component {
  //Controled component

  state = {
    passwd: "",
    passwd2: "",
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
        passwd: this.state.passwd,
        id: this.props.auth.user.id
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Alterar Senha</h1>
        {this.state.error === "equal" && (
          <Segment color="red">Senha e confirmação devem ser iguais!</Segment>
        )}
        {this.state.error === "lenght" && (
          <Segment color="red">A senha deve ter mais de 6 caracteres!</Segment>
        )}
        {this.props.auth.saved && (
          <Segment color="green">Senha alterada com sucesso!</Segment>
        )}
        {!this.props.auth.saved && (
          <Form>
            <Form.Field>
              <label>Nova senha</label>
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

            <Button onClick={this.handleSave}>Alterar Senha</Button>
          </Form>
        )}
      </div>
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
    save: user => dispatch(ActionCreators.updateProfileRequest(user)),
    reset: () => dispatch(ActionCreators.updateProfileReset())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePass);
