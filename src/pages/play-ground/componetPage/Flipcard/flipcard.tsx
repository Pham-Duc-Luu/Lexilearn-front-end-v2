import { Flashcard } from '@/api';
import EditFlashcard from '@/components/EditCard/Editflashcard';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
export const FlipCard = ({
  frontCard,
  backCard,
  isFlip: isFlipProps = false,
  isDisableFlip: isDisableFlipProps = false,
}: {
  frontCard?: ReactNode;
  backCard?: ReactNode;
  index?: number;
  isVisible?: boolean;
  isFlip?: boolean;
  isDisableFlip?: boolean;
}) => {
  const [isFlip, setIsFlip] = useState(isFlipProps);
  const [duration] = useState(0.25);
  const [isDisableFlip, setIsDisableFlip] = useState(isDisableFlipProps);

  const handlerFlip = () => {
    if (!isDisableFlip) setIsFlip(!isFlip);
  };

  return (
    <>
      <motion.div
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: isFlip ? 180 : 0, // Flip effect
        }}
        className=" relative"
        transition={{ duration, ease: 'easeInOut' }}>
        <motion.div
          exit={{ opacity: 0 }}
          animate={{ opacity: isFlip ? 0 : 1 }}
          style={{ backfaceVisibility: 'hidden' }}
          onClick={() => !isDisableFlip && handlerFlip()}
          transition={{ duration, ease: 'easeInOut' }}
          className="">
          {frontCard}
        </motion.div>

        <motion.div
          exit={{ opacity: 0 }}
          style={{ backfaceVisibility: 'hidden', rotateX: '-180deg' }}
          animate={{ opacity: !isFlip ? 0 : 1 }}
          onClick={() => !isDisableFlip && handlerFlip()}
          transition={{ duration, ease: 'easeInOut' }}
          className=" absolute top-0 w-full">
          {backCard}
        </motion.div>
      </motion.div>
    </>
  );
};

export function FlipableFlashcard({
  flashcard,
  className,
  type = 'front',
  ...props
}: { flashcard: Flashcard } & Partial<Parameters<typeof EditFlashcard>[0]>) {
  return (
    <FlipCard
      frontCard={
        <EditFlashcard
          isEditable={false}
          type="front"
          isDisplayHeader={false}
          id={flashcard?.id}
          className={cn(' min-w-[800px] w-full', className)}
          text={flashcard.front_text}
          sound={flashcard.front_sound}
          image={flashcard.front_image}></EditFlashcard>
      }
      backCard={
        <EditFlashcard
          isEditable={false}
          type="back"
          isDisplayHeader={false}
          id={flashcard?.id}
          className={cn('min-w-[800px] w-full', className)}
          text={flashcard.front_text}
          sound={flashcard.front_sound}
          image={flashcard.front_image}></EditFlashcard>
      }></FlipCard>
  );
}
export function SliderFlipableFlashcard({
  flashcards,
  setCarouselApi,
}: {
  flashcards: Flashcard[];
  setCarouselApi?: (e: CarouselApi) => void;
}) {
  return (
    <div className=" max-w-full">
      <Carousel
        setApi={setCarouselApi}
        opts={{
          // active: false,
          dragFree: false,
        }}>
        <CarouselContent>
          {flashcards.map((item, index) => (
            <CarouselItem
              key={index}
              className=" w-fit flex justify-center items-center ">
              {/* <Card
                className=" w-full  justify-center items-center "
                key={item?.id}> */}
              <FlipableFlashcard
                flashcard={item}
                className=" w-2/3"></FlipableFlashcard>
              {/* </Card> */}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
