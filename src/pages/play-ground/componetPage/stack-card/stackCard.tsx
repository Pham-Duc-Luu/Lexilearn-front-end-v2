import { cn } from '@/lib/utils';
import { Button } from '@heroui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';
import { TbMoodEmpty, TbMoodSick, TbMoodSmileBeam } from 'react-icons/tb';

export interface StackCardProps {
  cards?: ReactNode[];
  offset?: number;
  scaleFactor?: number;
  previewNumber?: number;
  traversalOptions?: { result: 'bad' | 'ok' | 'good' };
  onTraversalStart?: (e: {
    result?: 'bad' | 'ok' | 'good';
    index: number;
  }) => void;
  duration?: number;
  traversalLeftButton?: ReturnType<typeof useRef<HTMLButtonElement | null>>;
  traversalCenterButton?: ReturnType<typeof useRef<HTMLButtonElement | null>>;
  traversalRightButton?: ReturnType<typeof useRef<HTMLButtonElement | null>>;
  isDisplayTraversalButton?: boolean;
  className?: string;
}
const StackCard = ({
  cards: items,
  offset = 18,
  previewNumber = 5,
  scaleFactor,
  onTraversalStart = () => {},
  duration = 0.4,
  traversalLeftButton,
  traversalRightButton,
  traversalCenterButton,
  isDisplayTraversalButton = false,
  className,
}: StackCardProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState(items);

  const [traversalResult, settraversalResult] = useState<'bad' | 'ok' | 'good'>(
    'ok'
  );

  return (
    <div
      className={cn(
        ' w-full h-full flex justify-center items-center relative',
        className
      )}>
      <div className=" relative ">
        <AnimatePresence>
          {cards?.map((card, index) => {
            if (
              index >= currentCardIndex - 1 &&
              index < currentCardIndex + previewNumber
            )
              return (
                <motion.div
                  onAnimationStart={() => {}}
                  style={{
                    translateX: '-50%',
                    translateY: '-50%',
                    transformOrigin: 'top center',
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  animate={{
                    top:
                      index === currentCardIndex - 1
                        ? 200
                        : (index - currentCardIndex) * -CARD_OFFSET,
                    left:
                      index === currentCardIndex - 1
                        ? traversalResult === 'bad'
                          ? -200
                          : traversalResult === 'good'
                          ? 200
                          : 0
                        : 0,
                    opacity: index === currentCardIndex - 1 ? 0 : 1,
                    display: index === currentCardIndex - 1 ? 'none' : '',
                    scale:
                      index === currentCardIndex
                        ? 1.1
                        : 1 - (index - currentCardIndex) * SCALE_FACTOR, // decrease scale for cards that are behind
                    zIndex: cards.length - index, //  decrease z-index for the cards that are behind
                  }}
                  transition={{ duration, delay: 0 }}
                  key={index}
                  className=" absolute bg-white">
                  {card}
                </motion.div>
              );
          })}
        </AnimatePresence>
      </div>
      <div
        className={cn(
          ' absolute bottom-3  flex gap-3 ',
          !isDisplayTraversalButton && 'hidden'
        )}>
        <Button
          size="lg"
          className=" border-x-2 border-t-2 border-b-4 border-warning"
          radius="sm"
          color="warning"
          variant="flat"
          ref={traversalLeftButton}
          startContent={<TbMoodSick size={20} />}
          onPress={() => {
            settraversalResult('bad');
            setCurrentCardIndex(currentCardIndex + 1);
            onTraversalStart({ index: currentCardIndex });
          }}>
          bad
        </Button>
        <Button
          size="lg"
          className=" border-x-2 border-t-2 border-b-4 border-primary"
          radius="sm"
          color="primary"
          variant="flat"
          ref={traversalCenterButton}
          startContent={<TbMoodEmpty size={20} />}
          onPress={() => {
            settraversalResult('ok');

            setCurrentCardIndex(currentCardIndex + 1);
            onTraversalStart({ index: currentCardIndex });
          }}>
          ok
        </Button>
        <Button
          size="lg"
          ref={traversalRightButton}
          className=" border-x-2 border-t-2 border-b-4 border-success"
          radius="sm"
          color="success"
          variant="flat"
          startContent={<TbMoodSmileBeam size={20} />}
          onPress={() => {
            settraversalResult('good');

            setCurrentCardIndex(currentCardIndex + 1);
            onTraversalStart({ index: currentCardIndex });
          }}>
          good
        </Button>
      </div>
    </div>
  );
};

export default StackCard;
