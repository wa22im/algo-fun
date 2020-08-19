import React from "react";

import { Link } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";

export const Navbar = () => {
  return (
    <Menu
      size="large"
      style={{
        margin: "1px",
      }}
    >
      <Container>
        <Link to="/">
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
        </Link>
        <Link to="/sortv2">
          <Menu.Item as="a">sort algos</Menu.Item>
        </Link>
        <Link to="/heap">
          <Menu.Item as="a">heap</Menu.Item>
        </Link>
        <Link to="/map">
          <Menu.Item as="a">map</Menu.Item>
        </Link>
      </Container>
    </Menu>
  );
};
