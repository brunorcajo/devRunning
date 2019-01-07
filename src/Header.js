import React from "react";
import { connect } from "react-redux";
import ActionCreators from "./redux/actionCreators";
import { Link } from "react-router-dom";

import { Menu, Image } from "semantic-ui-react";

const Header = props => {
  return (
    <Menu>
      <Menu.Item as={Link} to="/">
        <Image src={"/assets/images/logo.png"} size="small" />
      </Menu.Item>
      <Menu.Item as={Link} to="/create-account">
        Criar uma conta
      </Menu.Item>
      <Menu.Item as={Link} to="/login">
        Entrar
      </Menu.Item>
    </Menu>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth //all
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signin: (email, passwd) => ActionCreators.signinRequest(email, passwd)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
