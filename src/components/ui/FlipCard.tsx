'use client';
import React, { useEffect, useState } from 'react';

import { Card, CardBody, CardProps } from '@heroui/react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@/redux/store/hooks';

export interface FlipCardProps extends CardProps {
  front?: string;
  back?: string;
  options?: {
    replace: {
      front: boolean | string;
      back: boolean | string;
    };
  };
  displaySide?: 'front' | 'back';
  CustomCard?: {
    FrontCard?: React.JSX.Element;
    BackCard?: React.JSX.Element;
  };
  onPress?: () => void;
  isFlipByPress?: boolean;
  text?: string;
}

export const ExtendCard = ({ text, className }: FlipCardProps) => {
  return (
    <Card className={cn('py-4  w-[100%] h-[100%] overflow-hidden', className)}>
      {/* <CardHeader className=" flex justify-end gap-3">
        <Button isIconOnly size="lg">
          <MdOutlineModeEdit size={28} />
        </Button>
        <Button isIconOnly size="lg">
          <PiStarThin size={28} />
        </Button>
      </CardHeader> */}
      <CardBody className=" overflow-hidden py-2 px-8 flex justify-center items-center text-2xl ">
        {text}
      </CardBody>
    </Card>
  );
};

const FlipCard = ({
  front,
  back,
  className,
  CustomCard,
  options,
  onPress = () => {},
  isFlipByPress = true,
  displaySide = 'front',
  ...props
}: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const dispatch = useAppDispatch();

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  }

  useEffect(() => {
    if (displaySide === 'front') {
      setIsFlipped(false);
    }
    if (displaySide === 'back') {
      setIsFlipped(true);
    }
  }, [displaySide]);

  return (
    <div
      className={cn(className, 'flip-card ')}
      onClick={(e) => {
        isFlipByPress && handleFlip();
        onPress();
      }}>
      <motion.div
        className="w-[100%] h-[100%]"
        initial={false}
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{ rotateX: isFlipped ? 180 : 360 }}
        transition={{ duration: 0.4, animationDirection: 'normal' }}
        onAnimationComplete={() => setIsAnimating(false)}>
        <ExtendCard
          className="flip-card-front"
          text={front ? front : '...'}></ExtendCard>
        <ExtendCard
          className="flip-card-back"
          text={back ? back : '...'}></ExtendCard>
      </motion.div>
    </div>
  );
};

export default FlipCard;
