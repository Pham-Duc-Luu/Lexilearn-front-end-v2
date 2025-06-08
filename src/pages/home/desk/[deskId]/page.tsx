import { Flashcard, useGetDeskQuery } from '@/api';
import { CarouselApi } from '@/components/ui/carousel';
import { SliderFlipableFlashcard } from '@/pages/play-ground/componetPage/Flipcard/flipcard';
import { Avatar, Button, ButtonGroup, Card, CardHeader } from '@heroui/react';
import { useEffect, useState } from 'react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { CiBookmarkPlus } from 'react-icons/ci';
import { PiShareFatLight } from 'react-icons/pi';
import { useParams } from 'react-router';
import ListFlashcard from './ListFlashcard';
export default function DeskPage() {
  const { deskId } = useParams<{ deskId: string }>();

  const getDesk = useGetDeskQuery({ deskId });
  const [selectedFlashcard, setSelectedFlashcard] = useState<Flashcard>();
  const [carouselApi, setcarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    if (getDesk.data?.getDesk?.flashcards)
      setSelectedFlashcard(getDesk.data?.getDesk?.flashcards[0]);
  }, [getDesk.data]);

  carouselApi?.reInit({ watchDrag: false });

  return (
    <div className="flex-1 overflow-y-scroll grid grid-cols-12 p-4 gap-4">
      <div className=" col-span-7">
        <Card
          isBlurred
          className=" w-full  flex justify-center items-center p-6 bg-none rounded-sm ">
          {/* <Card
              className=" h-[500px]  justify-center items-center "
              key={selectedFlashcard?.id}>
              {selectedFlashcard && (
               <FlipableFlashcard flashcard={selectedFlashcard}></FlipableFlashcard>
              )}
            </Card> */}
          {getDesk.data?.getDesk?.flashcards && (
            <SliderFlipableFlashcard
              setCarouselApi={setcarouselApi}
              flashcards={
                getDesk.data?.getDesk?.flashcards
              }></SliderFlipableFlashcard>
          )}
          <CardHeader className="flex flex-col items-start justify-center gap-4   ">
            <span className=" text-xl font-bold">
              {getDesk.data?.getDesk?.name}
            </span>
            <div className=" flex justify-between items-center w-full">
              <div className=" cursor-pointer  flex justify-center items-center gap-4">
                <Avatar src={getDesk.data?.getDesk?.owner?.avatar} />
                <div className="flex flex-col">
                  <p className="text-md">
                    {getDesk.data?.getDesk?.owner?.name}
                  </p>
                </div>
              </div>

              <div className=" space-x-4">
                <ButtonGroup variant="flat">
                  <Button isIconOnly>
                    <AiOutlineLike size={20} />
                  </Button>
                  <Button isIconOnly>
                    <AiOutlineDislike size={20} />
                  </Button>
                </ButtonGroup>
                <Button isIconOnly variant="flat">
                  <PiShareFatLight size={20} />
                </Button>
                <Button isIconOnly variant="flat">
                  <CiBookmarkPlus size={20} />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
      <div className=" col-span-5">
        <ListFlashcard
          onSelectFlashcard={(e) => carouselApi?.scrollTo(e.index, true)}
          className=" col-span-1 "
          previewFlashcards={getDesk.data?.getDesk?.flashcards}></ListFlashcard>
      </div>
    </div>
  );
}
