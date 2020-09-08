import React ,{useState} from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
const HeapModal = ({ onclose, open }) => {
 const [next, setnext] = useState(0);
 const problem =   <p>
 HackerLand National Bank has a simple policy for warning clients
 about possible fraudulent account activity. If the amount spent by a
 client on a particular day is greater than or equal to 2× the
 client's median spending for a trailing number of days, , they send
 the client a notification about potential fraud. The bank doesn't
 send the client any notifications until they have at least that
 trailing number of prior days' transaction data. Given the number of
 trailing days d and a client's total daily expenditures for a period
 of n days, find and print the number of times the client will
 receive a notification over all n days. For example, d = 3 and
 expenditures = [10, 20, 30, 40, 50]. On the first three days, they
 just collect spending data. At day 4, we have trailing expenditures
 of [10, 20, 30]. The median is 20 and the day's expenditure is 40.
 Because 40 ≥ 2 × 20, there will be a notice. The next day, our
 trailing expenditures are [20, 30, 40] and the expenditures are 50.
 This is less than 2 × 30 so no notice will be sent. Over the period,
 there was one notice sent.
</p>
const solution = <p>
    in order to solve the problem , i used <strong> Heap data Structre</strong> to keep track of the Median , and not sort our follow days every time we pass to new day ,
    <p> you can see the<strong> min heap</strong><strong> max heap</strong> in every time there is a notification</p> 
</p>
  return (
    <Modal onClose={() => onclose()} open={open}>
      <Modal.Header>Heap Visualization </Modal.Header>
      <Modal.Content image>
        <Image
          style={{
              height:"300px",
              width:'500px'
          }}
          src={process.env.PUBLIC_URL + "/assets/images/heap.PNG"}
          
        />
        <Modal.Description>
          <Header>Fraudulent activity notification </Header>
            {next==0?problem:solution}
          <p>Have Fun</p>
          <h5>
            {" "}
            the problem founded on{" "}
            <a
              href="https://www.hackerrank.com/challenges/fraudulent-activity-notifications/problem"
              target="_blank"
            >
              {" "}
              HackerRank
            </a>{" "}
            u can read more about it{" "}
          </h5>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
       { next==0?<Button positive onClick={() => setnext(1)}>
          Solution
        </Button>
         : <Button positive onClick={() => onclose()}>
         Got it
       </Button>}
      </Modal.Actions>
    </Modal>
  );
};

export default HeapModal;
