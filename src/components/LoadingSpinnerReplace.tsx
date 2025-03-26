import { Spinner } from "@heroui/react";
import React from "react";

const LoadingSpinnerReplace = () => {
  return (
    <div className=" flex h-full w-full justify-center items-center">
      <Spinner size="lg"></Spinner>
    </div>
  );
};

export default LoadingSpinnerReplace;
