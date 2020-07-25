import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
const GraphBtn = (props) => {
  const choosenIcon = "universal access";
  const wallIcon = 'circle'
  const endPointIcon = 'expand arrows alternate'

  const endPointColor = 'black'
  const normalColor = "teal";
  const choosenColor = "blue";
  const wallColor = "#5D4037";
  const [btnColor, setbtnColor] = useState(normalColor);
  const [btnIcon, setbtnIcon] = useState("");
  const [index , setIndex ] = useState(props.index)
  const [reserved  , setReserved ]= useState(false)

  const handleClick = (e) => {
    const phase = props.getPhase();
    switch (phase) {
      case 0:
        setbtnColor(choosenColor);
        setbtnIcon(choosenIcon);

        props.setStartPoint(index)
        props.updateStage();
        break;

      case 1:
        props.setWall(index)
        setbtnIcon(wallIcon)
        setbtnColor(wallColor);
        break;
      case 2:
        console.log(index)
        props.setMyEndPoint(index)
        setbtnColor(endPointColor);
        setbtnIcon(endPointIcon)
        props.updateStage()
    }
    setReserved(true)
  };
  return (
    <Button
    disabled = {reserved }
      icon
      style={{
        width: "60px",
        height: "30px",
        margin: "1%",
      }}
      
      name={props.key}
      color={btnColor}
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <Icon name={btnIcon} />
    </Button>
  );
};

export default GraphBtn;
