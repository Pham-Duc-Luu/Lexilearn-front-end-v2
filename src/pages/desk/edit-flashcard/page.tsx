'use client';
import {
  EditDeskInterface,
  updateFlashcard,
} from '@/redux/store/editDesk.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store/ProtoStore.slice';
import { useEffect, useState } from 'react';
import EditFlashcard from './_header/Editflashcard';
import './_header/Header.css';
export default function EditDeskVocalPage() {
  const { flashcards, currFlashcardPositionId } = useAppSelector(
    (state) => state.persistedReducer.EditDeskPage
  );

  const dispatch = useAppDispatch();
  // * update the current card to backend for every time create a new card
  useEffect(() => {}, []);

  return (
    <div className="h-fit p-4 overflow-y-scroll flex-1 grid grid-cols-12 gap-4">
      {flashcards?.map((item) => {
        if (item.orderId !== currFlashcardPositionId) {
          return <></>;
        }
        return (
          <FlashcardComponent
            onFlashcardChange={(content) => {
              console.log(content);

              dispatch(updateFlashcard(content));
            }}
            flashcard={item}></FlashcardComponent>
        );
      })}
    </div>
  );
}

export function FlashcardComponent({
  flashcard,
  onFlashcardChange,
}: {
  flashcard: EditDeskInterface['flashcards'][0];
  onFlashcardChange?: (e: EditDeskInterface['flashcards'][0]) => void;
}) {
  const [flashcardState, setFlashcardState] = useState(flashcard);
  useEffect(() => {
    if (onFlashcardChange) onFlashcardChange(flashcardState);
  }, [flashcardState, onFlashcardChange]);
  return (
    <>
      <EditFlashcard
        type="front"
        id={flashcardState.orderId}
        onCardContentChange={(e) =>
          setFlashcardState({
            ...flashcardState,
            front_image: e.image,
            front_text: e.text,
            front_sound: e.sound,
          })
        }
        cardContent={{
          text: flashcardState.front_text!,
          image: flashcardState.front_image!,
          sound: flashcardState.front_sound!,
        }}></EditFlashcard>
      <EditFlashcard
        type="back"
        id={flashcardState.orderId}
        onCardContentChange={(e) =>
          onFlashcardChange &&
          setFlashcardState({
            ...flashcardState,
            back_image: e.image,
            back_text: e.text,
            back_sound: e.sound,
          })
        }
        cardContent={{
          text: flashcardState.back_text!,
          image: flashcardState.back_image!,
          sound: flashcardState.back_sound!,
        }}></EditFlashcard>
    </>
  );
}
