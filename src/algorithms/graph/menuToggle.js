import React, { useState } from "react";
import { Dropdown, Button, Input, Label, Checkbox } from "semantic-ui-react";

const MenuToggle = ({ setNumberOfPoints, numberSearch, searchOn }) => {
  const handleClick = (e) => {
    e.preventDefault();
    setNumberOfPoints(e.target.value);
  };
  return (
    <Dropdown as={Button} item simple text="Multi point Search">
      <Dropdown.Menu>
        <Dropdown.Item>
          <label>Choose number of points </label>
          <Input
          
            disabled={searchOn}
            type="number"
            min="1"
            max="5"
            value={numberSearch}
            onChange={handleClick}
          ></Input>
        </Dropdown.Item>

        <Dropdown.Divider />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MenuToggle;
