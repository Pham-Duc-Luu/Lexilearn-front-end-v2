'use client';
import EditFlashcard from '@/components/EditCard/Editflashcard';
import {
  EditDeskInterface,
  updateFlashcard,
} from '@/redux/store/editDesk.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store/ProtoStore.slice';
import { Button, Tooltip } from '@heroui/react';
import { useEffect, useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import './_header/Header.css';

export default function EditDeskVocalPage() {
  const { flashcards, currFlashcardPositionId } = useAppSelector(
    (state) => state.persistedReducer.EditDeskPage
  );

  const dispatch = useAppDispatch();

  return (
    <div className="h-fit p-4 overflow-y-scroll flex-1 grid grid-cols-12 gap-4">
      {flashcards?.map((item) => {
        if (item.orderId !== currFlashcardPositionId) {
          return <></>;
        }
        return (
          <FlashcardComponent
            onFlashcardChange={(content) => {
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
      {/* This is where 2 card display so User can modify that flashcard  */}
      {/* this is front  */}
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
        endContent={
          <Tooltip color="danger" content="delete this card" placement="bottom">
            <Button
              color="danger"
              isIconOnly
              className=" rounded-sm"
              variant="light">
              <RiDeleteBin5Line size={24} />
            </Button>
          </Tooltip>
        }
        cardContent={{
          text: flashcardState.front_text!,
          image: flashcardState.front_image!,
          sound: flashcardState.front_sound!,
        }}></EditFlashcard>
      {/* this is back */}
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
