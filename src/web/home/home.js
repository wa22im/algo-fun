import PropTypes from "prop-types";
import React, { Component,Image, useState } from "react";
import {
  Button,
  Container,
  Header,
  Segment,
  Visibility,
  Icon,
} from "semantic-ui-react";
import { Splitext } from "./splitext";
import Footer from "../footer/footer";

const HomepageHeading = ({ mobile }) => {
  const [showOn, setshowOn] = useState(true);
  const handleMouseEnter = () => {
    setshowOn(false);
    setTimeout(() => {
      setshowOn(true);
    }, 1000);
  };

  return (
    <Container text>
      <div onMouseEnter={handleMouseEnter}>
        <Header
          as="h1"
          content="Hello stranger"
          inverted
          style={{
            fontSize: mobile ? "2em" : "4em",
            fontWeight: "normal",
            marginBottom: 0,
            marginTop: mobile ? "1.5em" : "3em",
          }}
        />
        {showOn ? (
          ""
        ) : (
          <h4
            style={{
              marginRight: "180px",
              color: "yellow",
            }}
          >
            {" "}
            i can't be typed :(
          </h4>
        )}
      </div>

      <Header
        as="h1"
        inverted
        style={{
          fontSize: mobile ? "1.5em" : "1.7em",
          fontWeight: "normal",
          marginTop: mobile ? "0.5em" : "1.5em",
        }}
      >
        <Splitext></Splitext>
      </Header>

      <Icon  name='gg' primary size="huge">

      </Icon>
    </Container>
  );
};

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

class DesktopContainer extends Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <Visibility once={false}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: "100vh", padding: "1em 0em" }}
            vertical
          >
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
        <Footer></Footer>
      </div>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};



const HomepageLayout = () => <DesktopContainer></DesktopContainer>;

export default HomepageLayout;
