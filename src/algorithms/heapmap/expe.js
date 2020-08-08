import React from "react";
import { Grid, Divider } from "semantic-ui-react";

const Expe = ({ exp, idx,color }) => {
 const  getColor = () => {};
  return (
    <Grid.Column
    color={color}
    >
      {exp}
      <Divider />
    </Grid.Column>
  );
};

export default Expe;
