import { cn } from '@/lib/utils';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Card, Divider } from '@heroui/react';
import { PiDotsNineBold } from 'react-icons/pi';
import { RiDeleteBinLine } from 'react-icons/ri';
export function SortableItem({
  index,
  id,
  onRemove,
  item,
  isHighLight = false,
  onSelect,
}: {
  index: number;
  id: string;
  onRemove?: (ID: string) => void;
  item: string;
  isHighLight?: boolean;
  onSelect?: (dndId: string) => void;
  onDelete?: (dndId: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="col-span-12">
      <Card className=" rounded-sm ">
        <Button
          className={cn(
            'rounded-sm px-0 w-full grid grid-cols-12 content-center gap-0',
            isHighLight
              ? 'bg-color-4/25  border-color-4 border-x-2 border-t-2 border-b-4 '
              : 'bg-color-3/15 border-2 border-color-3/30'
          )}
          onClick={() => onSelect && onSelect(id)}
          variant={isHighLight ? 'flat' : 'light'}>
          <p className="content-center col-span-1">{index}</p>
          <Divider orientation="vertical"></Divider>
          <span className="truncate col-span-6 content-center">{item}</span>
          <div className=" col-start-10 col-span-4 flex justify-center items-center">
            <Button
              color="danger"
              variant="light"
              onClick={() => {
                if (onRemove) onRemove(id);
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
