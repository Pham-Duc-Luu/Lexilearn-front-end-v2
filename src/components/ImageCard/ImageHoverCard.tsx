'use client';
import { cn } from '@/lib/utils';
import { Button, Card, CardProps, Image, ImageProps } from '@heroui/react';
import { useHover } from '@uidotdev/usehooks';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
export interface IImageHoverCardProps {
  url: string;
  footer?: ReactNode;
  cardProps?: CardProps;
  duration?: number;
  imageProps?: ImageProps;
}
const ImageHoverCard = ({
  imageProps = {},
  url,
  footer = (
    <>
      <p className="text-tiny text-white/80">Available soon.</p>
      <Button
        className="text-tiny text-white bg-black/20"
        color="default"
        radius="lg"
        size="sm"
        variant="flat">
        Notify me
      </Button>
    </>
  ),
  duration = 0.2,
  cardProps,
}: IImageHoverCardProps) => {
  const [ref, hovering] = useHover();
  const [isFetchError, setIsFetchError] = useState(false);
  return (
    <Card
      className={cn('border-none relative', isFetchError && ' hidden')}
      radius="lg"
      ref={ref}>
      <Image
        alt="Woman listing to music"
        className="object-cover"
        src={url}
        onError={() => setIsFetchError(true)}
        {...imageProps}
      />
      <AnimatePresence initial={false}>
        {hovering ? (
          <motion.div
            className='className="justify-between overflow-hidden w-full absolute -translate-x-1/2 z-20 left-1/2'
            initial={{ opacity: 0, bottom: 0 }}
            animate={{ opacity: 1, bottom: 10 }}
            exit={{ opacity: 0, bottom: 0 }}
            transition={{
              duration: duration,
              ease: 'easeIn',
            }}>
            <>{footer}</>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Card>
  );
};

export default ImageHoverCard;
