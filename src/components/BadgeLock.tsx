import { Badge } from "@heroui/react";
import React, { ReactNode } from "react";
import { FaLock } from "react-icons/fa";

const BadgeLock = ({ children }: { children: ReactNode }) => {
  return (
    <Badge
      isOneChar
      content={<FaLock />}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      {children}
    </Badge>
  );
};

export default BadgeLock;
