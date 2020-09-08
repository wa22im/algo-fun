import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import _ from "lodash";

const Tree = ({ data }) => {
  const [times, settimes] = useState(0);
  const transformHeapToTree = (data) => {
    let m = 0;
    let len = data.length;
    while (len > 0) {
      len = Math.floor(len / 2);
      m++;
    }
    settimes(m);
  };
  const creatRow = (indx) => {
    let startArray = Math.pow(2, indx);
    return !data ? (
      ""
    ) : (
      <React.Fragment>
        <Grid.Row>
          {_.times(startArray, (ind) => {
            return (
              <div
                style={{
                  margin: "auto",
                }}
              >
                <Grid.Column key={ind + indx + times}>
                  <div className='grid-container-div'>
                  {data[ind + startArray - 1]
                    ? data[ind + startArray - 1].valuee
                    : ""}
                    </div>
                </Grid.Column>
              </div>
            );
          })}
        </Grid.Row>
      </React.Fragment>
    );
  };
  useEffect(() => {
    if (data) transformHeapToTree(data);
    console.log(data);
  }, [data]);
  return <Grid>{_.times(times, (indx) => creatRow(indx))}</Grid>;
};

Tree.propTypes = {
  data: PropTypes.array,
};
export default Tree;
