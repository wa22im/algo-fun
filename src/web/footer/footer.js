import React from "react";
import { Header, List, Grid, Container, Icon } from "semantic-ui-react";

export default function Footer() {
  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <Container>
        <Grid divided stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header as="h4" content="About" />
              <List link>
                <List.Item 
                as ='a' >
                  <Icon
                   name='linkedin'
                  ></Icon>
                  <a href="https://github.com/wa22im">
                    {" "}
                    Wa22im
                  </a>
                </List.Item>
                <List.Item 
                as ='a' >
                  <Icon
                   name='github'
                  ></Icon>
                  <a href="">
                    {" "}
                    Wassim Miladi
                  </a>
                </List.Item>
                <List.Item
                  
                  onClick={() => {
                    window.location.href = `mailto:wa22im.miladi@ieee.org`;
                  }}
                  as="a"
                >
                    <Icon
                   name='mail'
                  ></Icon>
                  Contact Us
                </List.Item>
              </List>
            </Grid.Column>
            
            <Grid.Column width={7}>
             
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}
