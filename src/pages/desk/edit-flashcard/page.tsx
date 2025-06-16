'use client';
import EditFlashcard from '@/components/EditCard/Editflashcard';
import {
  EditDeskInterface,
  removeFlashcard,
  updateFlashcard,
} from '@/redux/store/editDesk.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store/ProtoStore.slice';
import { Button, Tooltip } from '@heroui/react';
import { useEffect, useRef, useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import './_header/Header.css';

export default function EditDeskVocalPage() {
  const { flashcards, currFlashcardPositionId } = useAppSelector(
    (state) => state.persistedReducer.EditDeskPage
  );

  const dispatch = useAppDispatch();

  const [currFlashcard, setcurrFlashcard] = useState<(typeof flashcards)[0]>();
  const prevFlashcardRef = useRef<(typeof flashcards)[0]>(undefined);

  useEffect(() => {
    // Update previous after logging
    prevFlashcardRef.current = currFlashcard;
  }, [currFlashcard]);

  useEffect(() => {
    setcurrFlashcard(
      flashcards.find((card) => card.id === currFlashcardPositionId)
    );
  }, [currFlashcardPositionId, flashcards]);

  return (
    <div className="h-fit p-4 overflow-y-scroll flex-1 grid grid-cols-12 gap-4">
      <>
        {flashcards.map((item, index) => {
          if (item.id === currFlashcardPositionId) {
            return (
              <FlashcardComponent
                key={index}
                flashcard={item}
                onFlashcardChange={(e) => {
                  dispatch(updateFlashcard(e));
                }}></FlashcardComponent>
            );
          }
        })}
        {/* {currFlashcard && (
          <FlashcardComponent
            flashcard={currFlashcard}
            onFlashcardChange={(e) => {
              console.log(e);

              dispatch(updateFlashcard(e));
            }}></FlashcardComponent>
        )} */}
      </>
    </div>
  );
}

export function FlashcardComponent({
  flashcard: initialCard,
  onFlashcardChange,
}: {
  flashcard: EditDeskInterface['flashcards'][0];
  onFlashcardChange?: (e: EditDeskInterface['flashcards'][0]) => void;
}) {
  const [flashcard, setFlashcardState] =
    useState<typeof initialCard>(initialCard);
  const dispatch = useAppDispatch();

  const [frontContent, setFrontContent] = useState({
    text: flashcard.front_text!,
    image: flashcard.front_image!,
    sound: flashcard.front_sound!,
  });

  const [backContent, setBackContent] = useState({
    text: flashcard.back_text!,
    image: flashcard.back_image!,
    sound: flashcard.back_sound!,
  });

  useEffect(() => {
    onFlashcardChange?.(flashcard);
  }, [flashcard, onFlashcardChange]);

  useEffect(() => {
    setFlashcardState({
      ...flashcard,
      back_text: backContent.text,
      back_image: backContent.image,
      back_sound: backContent.sound,
    });
  }, [backContent]);

  useEffect(() => {
    setFlashcardState({
      ...flashcard,
      front_text: frontContent.text,
      front_image: frontContent.image,
      front_sound: frontContent.sound,
    });
  }, [frontContent]);

  return (
    <>
      {/* This is where 2 card display so User can modify that flashcard  */}
      {/* this is front  */}
      <EditFlashcard
        type="front"
        id={flashcard.id}
        onCardContentChange={(e) => {
          setFrontContent(e);
        }}
        endContent={
          <Tooltip color="danger" content="delete this card" placement="bottom">
            <Button
              color="danger"
              isIconOnly
              onPress={() => dispatch(removeFlashcard(flashcard.id))}
              className=" rounded-sm"
              variant="light">
              <RiDeleteBin5Line size={24} />
            </Button>
          </Tooltip>
        }
        text={frontContent.text!}
        image={frontContent.image!}
        sound={frontContent.sound!}></EditFlashcard>
      {/* this is back */}
      <EditFlashcard
        type="back"
        id={flashcard.id}
        onCardContentChange={(e) => {
          setBackContent(e);
        }}
        text={backContent.text!}
        image={backContent.image!}
        sound={backContent.sound!}></EditFlashcard>
    </>
  );
}
