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
          className=" ">
          {frontCard}
        </motion.div>

        <motion.div
          exit={{ opacity: 0 }}
          style={{ backfaceVisibility: 'hidden', rotateX: '-180deg' }}
          animate={{ opacity: !isFlip ? 0 : 1 }}
          onClick={() => !isDisableFlip && handlerFlip()}
          transition={{ duration, ease: 'easeInOut' }}
          className=" absolute top-0 ">
          {backCard}
        </motion.div>
      </motion.div>
    </>
  );
};
