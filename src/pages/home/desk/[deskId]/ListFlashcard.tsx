'use client';
import { IPreviewFlashcard } from '@/redux/store/Desk.proto.slice';
import {
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Divider,
  Image,
} from '@heroui/react';

const FlashcardPre = ({
  data,
  index,
  ...props
}: { data: IPreviewFlashcard; index: number } & CardProps) => {
  return (
    <Card className=" rounded-md py-2 px-4" shadow="none" {...props}>
      <CardHeader className=" font-light p-0 ">
        {index + 1}. flashcard
      </CardHeader>
      <CardBody className=" flex justify-center items-center gap-4 px-0 py-2 flex-row">
        <div className=" flex-1 flex items-center justify-start gap-4 text-lg font-bold">
          <Image
            height={60}
            className=" aspect-square rounded-md"
            src={data.frontImage}
          />
          <div>{data.front}</div>
        </div>
        <Divider orientation="vertical" className=" h-20"></Divider>
        <div className=" flex-1 flex items-center justify-start gap-4 text-lg font-bold">
          <Image
            className=" aspect-square rounded-md"
            height={60}
            src={data.backImage}
          />
          <div>{data.back}</div>
        </div>
      </CardBody>
      <Divider></Divider>
    </Card>
  );
};
const ListFlashcard = ({
  previewFlashcards,
}: {
  previewFlashcards?: IPreviewFlashcard[];
}) => {
  return (
    <div className=" py-4  lg:mx-28  grid grid-cols-12">
      {/* {previewFlashcards &&
        previewFlashcards.length > 0 &&
        previewFlashcards.map((card, index) => {
          return <FlashcardPre data={card}></FlashcardPre>;
        })} */}
      <Card className=" col-start-2 col-span-10 rounded-sm">
        <CardHeader className=" font-bold">
          {previewFlashcards?.length} items
        </CardHeader>
        <Divider></Divider>
        <CardBody className="p-0">
          {previewFlashcards?.map((data, index) => (
            <>
              <FlashcardPre index={index} data={data}></FlashcardPre>
            </>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};

export default ListFlashcard;
