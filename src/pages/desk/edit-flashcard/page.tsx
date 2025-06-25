'use client';
import { usePutUpdateFlashcardMutation } from '@/api/user service/flashcard.api';
import EditFlashcard from '@/components/EditCard/Editflashcard';
import {
  EditDeskInterface,
  removeFlashcard,
  updateFlashcard,
} from '@/redux/store/editDesk.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store/ProtoStore.slice';
import { Button, Tooltip } from '@heroui/react';
import { usePrevious } from '@uidotdev/usehooks';
import * as cheerio from 'cheerio';
import * as lodash from 'lodash';
import { useEffect, useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import './_header/Header.css';

export default function EditDeskVocalPage() {
  const { flashcards, currFlashcardPositionId, deskInformation } =
    useAppSelector((state) => state.persistedReducer.EditDeskPage);

  const [PutUpdateFlashcardTrigger, PutUpdateFlashcardResult] =
    usePutUpdateFlashcardMutation();

  const previousCardId = usePrevious(currFlashcardPositionId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // * update the previous card to backend
    const flashcard = lodash.find(flashcards, (o) => {
      return o.id === previousCardId;
    });

    if (
      flashcard &&
      flashcard.front_text &&
      flashcard.front_text.length > 0 &&
      flashcard.back_text &&
      flashcard.back_text.length > 0
    ) {
      PutUpdateFlashcardTrigger({
        deskId: Number(deskInformation.id),
        flashcardId: Number(flashcard.id),
        data: {
          front_text: flashcard.front_text,
          back_text: flashcard.back_text,
          front_image: flashcard.front_image,
          front_sound: flashcard.front_sound,
          back_image: flashcard.back_image,
          back_sound: flashcard.back_sound,
          operation: 'UPDATE',
        },
      });
    }
  }, [previousCardId]);

  const [curCard, setCurCard] = useState<EditDeskInterface['flashcards'][0]>();

  useEffect(() => {
    const tem = lodash.find(
      flashcards,
      (o) => o.id === currFlashcardPositionId
    );

    if (tem) setCurCard(tem);
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
  onFlashcardChange = () => {},
  className,
}: {
  flashcard: EditDeskInterface['flashcards'][0];
  onFlashcardChange?: (e: EditDeskInterface['flashcards'][0]) => void;
  className?: string;
}) {
  const [flashcard, setFlashcardState] =
    useState<typeof initialCard>(initialCard);

  const dispatch = useAppDispatch();

  useEffect(() => {
    onFlashcardChange(flashcard);
  }, [flashcard]);

  if (!flashcard) {
    return <></>;
  }

  return (
    <>
      {/* This is where 2 card display so User can modify that flashcard  */}
      {/* this is front  */}
      <EditFlashcard
        className={className}
        type="front"
        id={flashcard.id}
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
        onTextChange={(e) => {
          const $ = cheerio.load(e.getHTML());
          let text = '';
          $('p').each((_, el) => {
            if ($(el).text().trim()) {
              text += `<p>${$(el).text().trim()}</p>`;
            }
          });
          if (text) {
            setFlashcardState({ ...flashcard, front_text: text });
          }
        }}
        onImageChange={(e) => {
          const temp = { ...flashcard, front_image: e };
          setFlashcardState(temp);
        }}
        onSoundChange={(e) => {
          setFlashcardState({ ...flashcard, front_sound: e });
        }}
        text={flashcard.front_text!}
        image={flashcard.front_image!}
        sound={flashcard.front_sound!}></EditFlashcard>
      {/* this is back */}
      <EditFlashcard
        className={className}
        type="back"
        id={flashcard.id}
        onTextChange={(e) => {
          const $ = cheerio.load(e.getHTML());
          let text = '';
          $('p').each((_, el) => {
            if ($(el).text().trim()) {
              text += `<p>${$(el).text().trim()}</p>`;
            }
          });
          if (text) {
            setFlashcardState({ ...flashcard, back_text: text });
          }
        }}
        onImageChange={(e) => {
          setFlashcardState({ ...flashcard, back_image: e });
        }}
        onSoundChange={(e) => {
          setFlashcardState({ ...flashcard, back_sound: e });
        }}
        text={flashcard.back_text!}
        image={flashcard.back_image!}
        sound={flashcard.back_sound!}></EditFlashcard>
    </>
  );
}
