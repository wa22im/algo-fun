import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import "./grid.css";
const GraphModal = ({ onclose, open }) => {
  return (
    <Modal onClose={() => onclose()} open={open}>
      <Modal.Header>Graph Visualization </Modal.Header>
      <Modal.Content image>
        <Image
        style={{
            height : '300px',
        }}
          src={process.env.PUBLIC_URL + "/assets/images/Map.PNG"}
          wrapped
        />
        <Modal.Description>
          <Header>Welcom To Graph Algorithms </Header>
          <p>
            As u can see , in this section , we try to apply diffrent Graph
            algos ,
          </p>
          <h5>the algorithms implemented are :</h5> 
          <p><strong> A*</strong> and <strong>Dijkstra</strong> for the weighted graphs</p>
          <p>
            {" "}
            <strong>Breadth First Search </strong>and<strong> Depth first Search</strong> for the unweighted
            graphs{" "}
          </p>
          <p>
            {" 1) "}
            you can add <strong>walls</strong> that we can not pass above them
            during our search , just by click down on your mouse and drag it
            around the map and create your own MAZE or generate them randomly <div className="grid-container-div wall-node"> </div>{" "}
          </p>
          <p>
            {"2)"}
            you can add <strong>Lack of Water</strong>, they are heavy nodes ,
            A* and Dijkstra will try to avoid them when looking for the optimal
            path <div className="grid-container-div lack-node"> </div>{" "}
          </p>
          <p>
            {"3)"}
            Also you can add <strong>Pick Points</strong>, points that A* and
            Dijkstra needs to pass from them to get to the destination ,{" "}
            <div className="grid-container-div pick-node"> 1</div>{" "}
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={() => onclose()}>
          Got it 
        </Button>
     
      </Modal.Actions>
    </Modal>
  );
};

export default GraphModal;
