import {
  Card,
  Image,
  Button,
  ImageProps,
  ButtonProps,
  CardProps,
} from '@heroui/react';
import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
export interface ImageEditorComponentProps {
  imageProps?: ImageProps;
  deleteButtonProps?: ButtonProps;
  wrapperProps?: CardProps;
}
const ImageEditorComponent = ({
  imageProps = { className: 'lg:h-[570px]' },
  wrapperProps,
  deleteButtonProps,
}: ImageEditorComponentProps) => {
  return (
    <Card {...wrapperProps}>
      <Image {...imageProps}></Image>
      <Button
        className=" absolute top-4 right-4 z-10 rounded-sm"
        color="danger"
        variant="flat"
        size="sm"
        isIconOnly={true}
        startContent={<AiOutlineDelete size={20} />}
        {...deleteButtonProps}>
        {/* {deleteButtonProps?.children} */}
      </Button>
    </Card>
  );
};

export default ImageEditorComponent;
