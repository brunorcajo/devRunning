import React from "react";
import { connect } from "react-redux";
import ActionCreators from "../../../redux/actionCreators";
import { Link } from "react-router-dom";

import { Menu, Dropdown, Image } from "semantic-ui-react";

const Header = props => {
  return (
    <Menu>
      <Menu.Item as={Link} to="/">
        <Image src={"/assets/images/logo.png"} size="small" />
      </Menu.Item>
      <Menu.Item as={Link} to="/admin">
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="/admin/users">
        Usuários
      </Menu.Item>
      <Menu.Item as={Link} to="/admin/runs">
        Corridas
      </Menu.Item>
      <Menu.Menu position="right">
        <Dropdown item text={props.auth.user.name}>
          <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/restrito">
                Modo: Usuário
              </Dropdown.Item>
            <Dropdown.Item as={Link} to='/restrito/my-account'>Minha conta</Dropdown.Item>
            <Dropdown.Item as={Link} to='/restrito/change-password'>Trocar senha</Dropdown.Item>
            <Dropdown.Item onClick={props.logout}>Sair</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
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
    signin: (email, passwd) => ActionCreators.signinRequest(email, passwd),
    logout: () => dispatch(ActionCreators.destroyAuthRequest())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
