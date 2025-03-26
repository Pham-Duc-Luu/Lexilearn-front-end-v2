"use client";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@heroui/react";
import React, { useState } from "react";
import { motion } from "framer-motion";
const PressableButton = ({ className, ...props }: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <motion.div
      onMouseDown={() => {
        setIsPressed(true);
      }}
      onMouseUp={() => {
        setIsPressed(false);
      }}
      className=" border-color-4 border-2"
    >
      <Button className={cn(className)} {...props} />
    </motion.div>
  );
};

export default PressableButton;
