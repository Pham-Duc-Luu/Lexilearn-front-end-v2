import { Card } from '@heroui/react';
import ImageDropZone from '../_component/ImageDropZone';
const ImageEditor = () => {
  return (
    <>
      <Card className=" shadow-sm">
        {/* <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            What to watch
          </p>
          <h4 className="text-white font-medium text-large">
            Stream the Acme event
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          // src="https://nextui.org/images/card-example-4.jpeg"
        /> */}
        <ImageDropZone></ImageDropZone>
      </Card>
    </>
  );
};

export default ImageEditor;
