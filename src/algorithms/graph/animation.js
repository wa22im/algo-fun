import React from "react";
import { Button, Container } from "semantic-ui-react";

const Animation = () => {
  handleClick = () => {};
  return (
    <div>
        <Button 
        color = 'black'
        
    style={{
            width="40px", 
            height= '50px' , 
            
        }}
        >
            helllo
        </Button>


      <Button onClick={handleClick}></Button>
    </div>
  );
};

export default Animation;
