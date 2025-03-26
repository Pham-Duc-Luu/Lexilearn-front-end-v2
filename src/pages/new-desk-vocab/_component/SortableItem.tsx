import { cn } from '@/lib/utils';
import {
  initNodeFromVocalList,
  removReoderVocabCard,
  ReoderVocabCardItem,
  setCurrentReoderVocabCardItem,
} from '@/redux/store/newDesk.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store/ProtoStore.slice';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Card, Divider } from '@heroui/react';
import * as _ from 'lodash';
import { useEffect, useState } from 'react';
import { PiDotsNineBold } from 'react-icons/pi';
import { RiDeleteBinLine } from 'react-icons/ri';
export function SortableItem({
  index,
  id,
  item,
}: {
  index: number;
  id: string;
  item: ReoderVocabCardItem;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const { currentReoderCardIndex, reoderCards } = useAppSelector(
    (state) => state.persistedReducer.NewDesk
  );

  const dispatch = useAppDispatch();
  const [currentReorderVocal, setcurrentReorderVocal] =
    useState<ReoderVocabCardItem>();

  useEffect(() => {
    setcurrentReorderVocal(
      _.find(reoderCards, function (o) {
        return o.id === currentReoderCardIndex;
      })
    );
  }, [currentReoderCardIndex]);

  return (
    <div ref={setNodeRef} style={style} className="col-span-12">
      <Card className=" rounded-sm ">
        <Button
          className={cn(
            'rounded-sm px-0 w-full grid grid-cols-12 content-center gap-0',
            currentReorderVocal?.id === item.id
              ? 'bg-color-4/25  border-color-4 border-x-2 border-t-2 border-b-4 '
              : 'bg-color-3/15 border-2 border-color-3/30'
          )}
          onClick={() => {
            if (currentReoderCardIndex != item.id) {
              dispatch(setCurrentReoderVocabCardItem(item.id));
              dispatch(initNodeFromVocalList(item.id));
            }
          }}
          variant={currentReorderVocal?.id === item.id ? 'flat' : 'light'}>
          <p className="content-center col-span-1">{index}</p>
          <Divider orientation="vertical"></Divider>
          <span className="truncate col-span-6 content-center">
            {item.word?.text}
          </span>
          <div className=" col-start-10 col-span-4 flex justify-center items-center">
            <Button
              color="danger"
              variant="light"
              onClick={(e) => {
                dispatch(removReoderVocabCard(item.id));
              }}
              radius="full"
              className=" col-start-11 col-span-1 p-0 min-w-0 aspect-square">
              <RiDeleteBinLine size={20} />
            </Button>
            <div
              className=" col-start-12 content-center cursor-move"
              {...attributes}
              {...listeners}
              onClick={(e) => {
                e.preventDefault();
              }}>
              <PiDotsNineBold size={20} />
            </div>
          </div>
        </Button>
      </Card>
    </div>
  );
}
