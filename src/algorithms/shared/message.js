import React, { useState } from "react";
import { Message } from "semantic-ui-react";

export const MessageNotif = ({ messageHeader, messageBudy, color }) => {
  return (
    <Message color={color}>
      <Message.Header>{messageHeader}</Message.Header>
      <p>{messageBudy}</p>
    </Message>
  );
};
