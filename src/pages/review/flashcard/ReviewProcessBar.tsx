'use client';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/redux/store/ProtoStore.slice';
import { motion, useSpring } from 'framer-motion';
import { useEffect } from 'react';
const ReviewProcessBar = () => {
  const { currentFlashcardIndex, flashcards } = useAppSelector(
    (state) => state.persistedReducer.ReviewFlashCard
  );

  const scaleX = useSpring(0, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  useEffect(() => {
    scaleX.set(currentFlashcardIndex / flashcards.length);
  }, [currentFlashcardIndex, flashcards]);

  return (
    <motion.div
      className={cn(
        'fixed inset-x-0 top-0 z-[1000] h-1 origin-left bg-gradient-to-r from-color-2 via-color-3 to-color-4'
      )}
      style={{
        scaleX,
      }}
    />
  );
};

export default ReviewProcessBar;
