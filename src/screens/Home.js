import React from "react";
import Header from "../Header";
import { Image, Segment } from "semantic-ui-react";

const Home = props => {
  return (
    <React.Fragment>
      <Header />
      <Segment>
        <Image
          src="./assets/images/logo-home.png"
          size="medium"
          centered
        />
      </Segment>
    </React.Fragment>
  );
};

export default Home;
