import React, { useState, useEffect ,createRef  } from "react";
import { Grid, Button, Icon, Container } from "semantic-ui-react";
import _ from "lodash";



const MyMap = () => {
  const myRef = createRef()


  const [activeColor, setactiveColor] = useState('blue');
const handleClick=(e)=>{ 

console.log(myRef)
myRef.current.props.color='red'

}
  const rows = _.times(10, (i) => (
    <Grid.Row
      style={{
        padding: "1px",
        margin: "2px",
      }}
      key={i + "row"}
    >
      {_.times(16, (j) => (
        <Grid.Column stretched width={1} key={j}>
          <Button
            name={`[${i},${j}]`}
            color='teal'
            ref={myRef}
            onClick={(e) => {
             handleClick(e)

            }}
          ></Button>
        </Grid.Column>
      ))}
    </Grid.Row>
  ));
  return (
    <Container
      style={{
        width: "90%",
        margin: "1%",
      }}
      fluid
    >
      <Grid columns={16} padded>
        {rows}
      </Grid>
    </Container>
  );
};

export default MyMap;
