import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useRef, useState } from 'react';
import { SortableItem } from './SortableItem';
export default function DndGroup<T>({
  items,
  onDragEnd,
  onSelect,
  onDeleteItem,
  highlightItemId,
}: {
  items: (T & { dndId: string; text: string })[];
  onDragEnd?: (event: DragEndEvent) => void;
  onSelect?: (dndId: string) => void;
  onDeleteItem?: (dndId: string) => void;
  highlightItemId?: string;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  useEffect(() => {
    const checkScrollbar = () => {
      if (containerRef.current) {
        // Check if the container has a vertical scrollbar
        const isScrollable =
          containerRef.current.scrollHeight > containerRef.current.clientHeight;
        setHasScrollbar(isScrollable);
      }
    };

    // Check scrollbar on load and whenever the window resizes
    checkScrollbar();
    window.addEventListener('resize', checkScrollbar);

    return () => {
      window.removeEventListener('resize', checkScrollbar);
    };
  }, [containerRef.current]);
  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-12 gap-2 overflow-auto py-2 ${
        hasScrollbar ? 'px-0' : 'px-1'
      } [&::-webkit-scrollbar]:w-1
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
        modifiers={[
          restrictToFirstScrollableAncestor,
          restrictToVerticalAxis,
          restrictToWindowEdges,
        ]}>
        <SortableContext
          items={items.map((item) => ({ ...item, id: item.dndId }))}
          strategy={verticalListSortingStrategy}>
          {items.map((item, index) => (
            <SortableItem
              key={item.dndId}
              isHighLight={highlightItemId === item.dndId}
              onRemove={onDeleteItem}
              onSelect={onSelect}
              index={index + 1}
              item={item.text}
              id={item.dndId}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
