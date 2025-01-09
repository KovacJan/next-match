import { NextUIProvider } from "@nextui-org/react";
import React from "react";

const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Providers;
