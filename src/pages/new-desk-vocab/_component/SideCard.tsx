'use client';
import { initNode, ReoderVocabCardItem } from '@/redux/store/newDesk.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store/ProtoStore.slice';
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Reorder, useAnimation } from 'framer-motion';
import { useRef } from 'react';
import DndGroup from '../_component/DndGroup';

const SideCardOrderItem = ({ item }: { item: ReoderVocabCardItem }) => {
  return <Reorder.Item value={item}></Reorder.Item>;
};
const SideCard = () => {
  const { reoderCards } = useAppSelector(
    (state) => state.persistedReducer.NewDesk
  );
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollAnimation = useAnimation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddVocabulary = () => {
    dispatch(initNode());
    // Scroll to the bottom of the container
    if (scrollRef.current) {
      scrollRef.current.scroll({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <DndGroup></DndGroup>
    </>
  );
};

export default SideCard;
