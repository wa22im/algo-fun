import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
const SortModal = ({ onclose, open }) => {
  return (
    <Modal onClose={() => onclose()} open={open}>
      <Modal.Header>Sorting Visualization </Modal.Header>
      <Modal.Content image>
        <Image
         size='massive'
          src={process.env.PUBLIC_URL + "/assets/images/sort.PNG"}
          wrapped
        />
        <Modal.Description>
          <Header>Welcom To Sort Algorithms </Header>
          <p>
            As u can see , in this section , we try to Visualise sort algorithms
          </p>
          <h5>the algorithms implemented are :</h5>
          <p>
            <strong> Merge Sort </strong> , <strong> Quick Sort</strong>,{" "}
            <strong> Radix Sort</strong>
            <strong>Selection Sort </strong> ,<strong> Insertion Sort</strong>
            and <strong> Bubble Sort</strong>
          </p>
        <p>
            Have Fun 
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

export default SortModal;
