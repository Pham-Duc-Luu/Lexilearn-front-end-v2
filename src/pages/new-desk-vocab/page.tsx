'use client';
import { ReoderVocabCardItem } from '@/redux/store/newDesk.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store/ProtoStore.slice';
import * as _ from 'lodash';
import { useEffect, useState } from 'react';
import EditFlashcard from './_header/Editflashcard';
import './_header/Header.css';
export default function NewDeskVocalPage() {
  const { reoderCards, currentReoderCardIndex } = useAppSelector(
    (state) => state.persistedReducer.NewDesk
  );
  const dispatch = useAppDispatch();

  const [card, setCard] = useState<ReoderVocabCardItem>();

  useEffect(() => {
    const card = _.find(reoderCards, function (card) {
      return card.id === currentReoderCardIndex;
    });

    if (card) {
      setCard(card);
    }
  }, [currentReoderCardIndex, reoderCards]);

  // * update the current card to backend for every time create a new card
  useEffect(() => {}, []);

  return (
    <div className="h-fit p-4 overflow-y-scroll flex-1 grid grid-cols-12 gap-4">
      {reoderCards.map((item, index) => {
        if (item.id !== currentReoderCardIndex) {
          return <></>;
        }
        return (
          <>
            <EditFlashcard
              type="front"
              id={item.id}
              cardContent={item.word}></EditFlashcard>
            <EditFlashcard
              type="back"
              id={item.id}
              cardContent={item.mean}></EditFlashcard>
          </>
        );
      })}
    </div>
  );
}
