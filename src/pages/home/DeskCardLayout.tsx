import { faker } from '@faker-js/faker';
import { Card, CardBody, CardFooter, Image } from '@heroui/react';

const DeskCardLayout = () => {
  return (
    <div className=" grid lg:grid-cols-12 grid-cols-4 md:grid-cols-8  gap-6 p-4">
      {Array.from({ length: 100 }).map(() => {
        return (
          <Card
            isFooterBlurred
            isPressable
            className=" col-span-2 border-2 border-white/20"
            radius="lg">
            <CardBody className=" p-0">
              <Image
                className="w-full object-cover h-[140px]"
                radius="lg"
                shadow="sm"
                width="100%"
                src={faker.image.urlPicsumPhotos()}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b className="truncate">{faker.book.title()}</b>
              <p className="text-default-500">{faker.finance.amount()}</p>
            </CardFooter>
            {/* <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Available soon.</p>
              <Button
                className="text-tiny text-white bg-black/20"
                color="default"
                radius="lg"
                size="sm"
                variant="flat"
              >
                Notify me
              </Button>
            </CardFooter> */}
          </Card>
        );
      })}
    </div>
  );
};

export default DeskCardLayout;
