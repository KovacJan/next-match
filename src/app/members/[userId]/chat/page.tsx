import React from "react";
import { CardHeader, Divider, CardBody } from "@nextui-org/react";

const ChatPage: React.FC = () => {
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Chat
      </CardHeader>
      <Divider />
      <CardBody>Chat go gere</CardBody>
    </>
  );
};

export default ChatPage;
