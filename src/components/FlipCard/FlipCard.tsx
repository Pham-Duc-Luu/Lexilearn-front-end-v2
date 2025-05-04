'use client';
import EditFlashcard from '@/components/EditCard/Editflashcard';
import { cn } from '@/lib/utils';
import { FlipCard as NewFlipCard } from '@/pages/play-ground/componetPage/Flipcard/flipcard';
import StackCard from '@/pages/play-ground/componetPage/stack-card/stackCard';
import { FlashCardType } from '@/redux/store/ReviewFlashcard.slice';
import { Button, Card, CardBody, Image } from '@heroui/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { CgEditFlipV } from 'react-icons/cg';
import { TbMoodEmpty, TbMoodSick, TbMoodSmileBeam } from 'react-icons/tb';

export const FlipCard = ({
  Flashcard = {},
  CARD_OFFSET = 10,
  SCALE_FACTOR,
  index,
  flashcards,
  currentFlashcardIndex = 0,
}: {
  Flashcard?: FlashCardType;
  CARD_OFFSET?: number;
  SCALE_FACTOR?: number;
  flashcards?: FlashCardType[];
  index?: number;
  currentFlashcardIndex?: number;
  isVisible?: boolean;
}) => {
  const [isFlip, setIsFlip] = useState(false);
  const [duration] = useState(0.25);
  const [isDisplay, setIsDisplay] = useState(true);
  const [isDisableFlip, setIsDisableFlip] = useState(false);

  const handlerFlip = () => {
    if (!isDisableFlip) setIsFlip(!isFlip);
  };

  const handleNextCardAnimationComplete = () => {
    if (
      Flashcard.index < currentFlashcardIndex ||
      Flashcard.index > currentFlashcardIndex + 4
    ) {
      setIsDisplay(false);
    }

    setIsDisableFlip(false);
  };

  const handleNextCardAnimationStart = () => {
    setIsDisableFlip(true);
  };

  const cards: { image?: string; text: string; sound?: string }[] = [
    {
      image: Flashcard.front_image,
      text: Flashcard.front_text,
      sound: Flashcard.front_sound,
    },
    {
      image: Flashcard.back_image,
      text: Flashcard.back_text,
      sound: Flashcard.back_sound,
    },
  ];

  return (
    <>
      <motion.div
        onAnimationComplete={() => handleNextCardAnimationComplete()}
        onAnimationStart={() => handleNextCardAnimationStart()}
        className={cn(
          ' lg:w-[1000px] lg:h-[450px] w-20 h-20  rounded-sm   absolute bg-transparent flex flex-col justify-between',
          !isDisplay && 'hidden'
        )}
        key={index}
        exit={{ top: 200, opacity: 0 }}
        style={{
          transformOrigin: 'top center',
          perspective: '1000px',
        }}
        transition={{ duration: 0.4, delay: 0 }}
        animate={{
          top:
            Flashcard.index === currentFlashcardIndex - 1
              ? 200
              : (Flashcard.index - currentFlashcardIndex) * -CARD_OFFSET,
          left:
            Flashcard.index === currentFlashcardIndex - 1
              ? Flashcard.review_result === 'bad'
                ? -200
                : Flashcard.review_result === 'good'
                ? 200
                : 0
              : 0,

          opacity: Flashcard.index === currentFlashcardIndex - 1 ? 0 : 1,
          scale: 1 - (Flashcard.index - currentFlashcardIndex) * SCALE_FACTOR, // decrease scale for cards that are behind
          zIndex: flashcards?.length - Flashcard.index, //  decrease z-index for the cards that are behind
        }}>
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d', // Enable 3D transformations
          }}
          animate={{
            rotateX: isFlip ? 180 : 0, // Flip effect
          }}
          className=""
          transition={{ duration, ease: 'easeInOut' }}>
          {cards.map((card, index) => {
            return (
              <motion.div
                key={index}
                style={
                  index === 0
                    ? {
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        scale: 0.97,
                        backfaceVisibility: 'hidden', // Hide when flipped
                      }
                    : {
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden', // Hide when flipped
                        transform: 'rotateX(180deg)', // Rotate back face
                      }
                }
                exit={{ opacity: 0 }}
                animate={
                  index === 0
                    ? { opacity: !isFlip ? 1 : 0 }
                    : { opacity: !isFlip ? 0 : 1 }
                }
                onClick={() => handlerFlip()}
                transition={{ duration, ease: 'easeInOut' }}
                className=" ">
                <Card
                  className={cn(
                    ' w-full h-full overflow-hidden  rounded-sm shadow-2xl border-t-3 border-b-[8px] border-x-3 ',
                    Flashcard.review_result === 'default' && 'border-color-4',
                    Flashcard.review_result === 'bad' && 'border-warning',
                    Flashcard.review_result === 'good' && 'border-success'
                  )}>
                  <CardBody
                    className={cn(
                      ' py-2  grid   gap-6 overflow-hidden grid-cols-2',
                      Flashcard.review_result === 'default' && 'bg-color-4/20',
                      Flashcard.review_result === 'bad' && 'bg-warning/20',
                      Flashcard.review_result === 'good' && 'bg-success/20',
                      Flashcard.review_result === 'ok' && 'bg-primary/20'
                    )}>
                    {card?.image && (
                      <div className=" border-gray-400 flex justify-center items-center content-center">
                        <Image
                          alt="Card front"
                          src={card?.image}
                          disableSkeleton={false}
                          className=" rounded-sm "
                          width={400}
                          height={400}
                          radius="sm"
                        />
                      </div>
                    )}

                    <div
                      className={cn(
                        ' w-full h-full  flex justify-center items-center overflow-y-scroll',
                        card?.image ? ' col-span-1' : 'col-span-2'
                      )}>
                      <span className=" text-6xl font-bold">{card?.text}</span>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
      {Flashcard.index === currentFlashcardIndex && (
        <Button
          className=" absolute translate-x-full translate-y-1/2 bottom-1/2 -right-4 border-x-2 border-t-2 border-b-4 bg-color-3/20 border-color-3"
          radius="sm"
          variant="flat"
          startContent={<CgEditFlipV size={20} />}
          onPress={() => {
            handlerFlip();
          }}
          size="lg">
          Flip
        </Button>
      )}
    </>
  );
};

export const FlipCardList = ({
  offset,
  scaleFactor,
  startIndex,
  onFlashcardReviewOption,
  onIndexChange,
  ...props
}: {
  offset?: number;
  scaleFactor?: number;
  startIndex: number;
  flashcards: FlashCardType[];
  onFlashcardReviewOption?: (e: FlashCardType) => void;
  onIndexChange?: (e: number) => void;
}) => {
  const CARD_OFFSET = offset || 10;
  const [flashcards, setFlashcard] = useState(props.flashcards);
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [currentFlashcardIndex, setCurrentFlashcardIndex] =
    useState(startIndex);

  useEffect(() => {
    onIndexChange?.(currentFlashcardIndex);
  }, [currentFlashcardIndex]);

  const goodButtonRef = useRef<HTMLButtonElement>(null);
  const okButtonRef = useRef<HTMLButtonElement>(null);
  const badButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className=" flex flex-col justify-center items-center gap-4">
      <StackCard
        className=" h-[600px]"
        traversalCenterButton={okButtonRef}
        traversalLeftButton={badButtonRef}
        traversalRightButton={goodButtonRef}
        cards={props.flashcards.map((item, index) => {
          return (
            <NewFlipCard
              frontCard={
                <EditFlashcard
                  isEditable={false}
                  isDisplayHeader={false}
                  type="front"
                  id={item.id.toString()}
                  className=" w-[800px] "
                  cardContent={{
                    text: item.front_text,
                    sound: item.front_sound,
                    image: item.front_image,
                  }}></EditFlashcard>
              }
              backCard={
                <EditFlashcard
                  isDisplayHeader={false}
                  isEditable={false}
                  type="back"
                  id={item.id.toString()}
                  className=" w-[800px]"
                  cardContent={{
                    text: item.back_text,
                    sound: item.back_sound,
                    image: item.back_image,
                  }}></EditFlashcard>
              }></NewFlipCard>
          );
        })}></StackCard>

      <div className=" flex items-center justify-center gap-8">
        <Button
          className=" border-x-2 border-t-2 border-b-4 border-warning"
          radius="sm"
          color="warning"
          variant="flat"
          startContent={<TbMoodSick size={20} />}
          onPress={() => {
            badButtonRef?.current?.click();

            onFlashcardReviewOption?.({
              ...flashcards[currentFlashcardIndex],
              review_result: 'bad',
            });
            flashcards[currentFlashcardIndex].review_result = 'bad';
            setCurrentFlashcardIndex(currentFlashcardIndex + 1);
          }}
          size="lg">
          bad
        </Button>
        <Button
          size="lg"
          className=" border-x-2 border-t-2 border-b-4 border-primary"
          radius="sm"
          color="primary"
          variant="flat"
          onPress={() => {
            okButtonRef?.current?.click();

            onFlashcardReviewOption?.({
              ...flashcards[currentFlashcardIndex],
              review_result: 'ok',
            });
            flashcards[currentFlashcardIndex].review_result = 'ok';
            setCurrentFlashcardIndex(currentFlashcardIndex + 1);
          }}
          startContent={<TbMoodEmpty size={20} />}>
          ok
        </Button>
        <Button
          size="lg"
          className=" border-x-2 border-t-2 border-b-4 border-success"
          radius="sm"
          color="success"
          variant="flat"
          onPress={() => {
            goodButtonRef?.current?.click();

            onFlashcardReviewOption?.({
              ...flashcards[currentFlashcardIndex],
              review_result: 'good',
            });
            flashcards[currentFlashcardIndex].review_result = 'good';
            onFlashcardReviewOption?.({
              ...flashcards[currentFlashcardIndex],
              review_result: 'good',
            });

            setCurrentFlashcardIndex(currentFlashcardIndex + 1);
          }}
          startContent={<TbMoodSmileBeam size={20} />}>
          good
        </Button>
      </div>
    </div>
  );
};

export default FlipCard;
