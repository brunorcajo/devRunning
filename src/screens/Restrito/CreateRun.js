import React, { Component } from "react";
import ActionCreators from "../../redux/actionCreators";
import { connect } from "react-redux";

import { Button, Segment, Form } from "semantic-ui-react";
import InputMoment from "input-moment";
import "input-moment/dist/input-moment.css";
import moment from "moment";

class CreateRun extends Component {
  //Controled component

  state = {
    friendly_name: "",
    duration: 0,
    distance: 0,
    created: moment(),
    saved: false,
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
    const d = moment.tz(this.state.created, this.props.auth.user.timezone);
    const d2 = d
      .clone()
      .utc()
      .format("YYYY-MM-DD H:MM:SS");
    const distance = this.state.distance;

    this.props.create({
      friendly_name: this.state.friendly_name,
      duration: this.state.duration,
      distance:
        this.props.auth.user.unit === "metric" ? distance : distance * 1.60934,
      created: d2
    });

    //redirect
    setTimeout( () => { this.props.history.push('/restrito/runs') },3000 )
  };

  render() {
    //if(this.props.runs.saved){
    //    return <Redirect to='/restrito/runs' />
    //}
    return (
      <div>
        <h1>Criar corrida</h1>
        {this.props.runs.saved && (
          <Segment color="green">Corrida Cadastrada com sucesso!</Segment>
        )}
        {!this.props.runs.saved && (
          <Form>
            <Form.Field>
              <label>Nome</label>
              <input
                type="text"
                value={this.state.friendly_name}
                onChange={this.handleChange("friendly_name")}
              />
            </Form.Field>

            <Form.Field>
              <label>Duration</label>
              <input
                type="number"
                value={this.state.duration}
                onChange={this.handleChange("duration")}
              />
            </Form.Field>

            <Form.Field>
              <label>
                Distancia({" "}
                {this.props.auth.user.unit === "metric" ? "km" : "mi"} )
              </label>
              <input
                type="number"
                value={this.state.distance}
                onChange={this.handleChange("distance")}
              />
            </Form.Field>

            <Form.Field>
              <label>Criação</label>
              <input
                type="text"
                value={this.state.created.format("DD/MM/YYYY H:mm:ss")}
                onChange={this.handleChange("created")}
              />
            </Form.Field>

            <Form.Field>
              <label>Criação</label>
              <InputMoment
                moment={this.state.created}
                onChange={val => this.setState({ created: val })}
              />
            </Form.Field>

            <Button onClick={this.handleSave}>Criar corrida</Button>
          </Form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    runs: state.runs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    create: run => dispatch(ActionCreators.createRunRequest(run)),
    reset: () => dispatch(ActionCreators.createRunReset())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRun);
