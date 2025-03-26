'use client';
import { routeProto } from '@/redux/store/route.slice';
import { Pagination, PaginationProps } from '@heroui/react';
import { useNavigate } from 'react-router';

const PaginationBlock = ({ ...props }: Partial<PaginationProps>) => {
  const navigate = useNavigate();
  return (
    <>
      <Pagination
        onChange={(e) => {
          navigate(routeProto.LIBRARY(undefined, e));
        }}
        showControls
        className="gap-2 "
        initialPage={1}
        classNames={{
          cursor: ' bg-color-4',
          wrapper: 'bg-color-4/20',
        }}
        isCompact
        total={1}
        variant="light"
        {...props}
      />
    </>
  );
};

export default PaginationBlock;
