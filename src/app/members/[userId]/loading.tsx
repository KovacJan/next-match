import React from "react";
import { Spinner } from "@nextui-org/react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center vertical-center">
      <Spinner label="Loading..." color="secondary" labelColor="secondary" />
    </div>
  );
};

export default Loading;
