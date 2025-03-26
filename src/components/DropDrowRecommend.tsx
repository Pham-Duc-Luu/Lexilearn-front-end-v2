import { cn } from "@/lib/utils";
import { Card, CardBody, CardProps } from "@heroui/react";
import React from "react";

const DropDrowRecommend = ({
  filters = [],
  className,
  onSelect,
}: CardProps & { filters?: string[]; onSelect?: (item: string) => void }) => {
  return (
    <Card
      className={cn(
        " absolute z-30 translate-y-2 overflow-y-scroll top-full origin-top rounded-sm",
        className
      )}
    >
      {filters?.map((item, index) => {
        return (
          <CardBody
            className=" cursor-pointer hover:bg-color-4/20"
            onClick={() => {
              onSelect && onSelect(item);
            }}
            key={index}
          >
            {item}
          </CardBody>
        );
      })}
    </Card>
  );
};

export default DropDrowRecommend;
