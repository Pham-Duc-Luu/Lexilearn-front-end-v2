import {
  removeFlashcard,
  setCurrFlashcardPositionId,
  setFlashcards,
} from '@/redux/store/editDesk.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store/ProtoStore.slice';
import { arrayMove } from '@dnd-kit/sortable';
import { convert } from 'html-to-text';
import lodash from 'lodash';
import DndGroup from '../_component/DndGroup';
const SideCard = () => {
  const { flashcards, currFlashcardPositionId } = useAppSelector(
    (state) => state.persistedReducer.EditDeskPage
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <DndGroup
        onDeleteItem={(dndId) => dispatch(removeFlashcard(dndId))}
        highlightItemId={currFlashcardPositionId}
        onSelect={(dndId) =>
          dndId && dispatch(setCurrFlashcardPositionId(dndId))
        }
        onDragEnd={(e) => {
          const { active, over } = e;

          console.log({ active, over });
          if (active.id !== over?.id) {
            const oldIndex = lodash.findIndex(flashcards, function (o) {
              return o.orderId === active.id;
            });
            const newIndex = lodash.findIndex(flashcards, function (o) {
              return o.orderId === over?.id;
            });

            dispatch(setFlashcards(arrayMove(flashcards, oldIndex, newIndex)));
          }
        }}
        items={flashcards.map((item) => {
          // * check if any card is not fullfill with front and back text, if not => warning

          if (!item?.front_text || item.front_text.length === 0) {
            return {
              dndId: item.orderId,
              buttonProps: {
                color: 'warning',
              },
              tooltipProps: {
                content: 'Please finish the text in the front',
                color: 'warning',
                placement: 'left-start',
              },
              text: item.front_text
                ? convert(item.front_text).split('\n')[0]
                : '',
            };
          }

          if (!item?.back_text || item.back_text.length === 0) {
            return {
              dndId: item.orderId,
              buttonProps: {
                color: 'warning',
              },
              tooltipProps: {
                content: 'Please finish the text in the back',
                color: 'warning',
                placement: 'left-start',
              },
              text: item.front_text
                ? convert(item.front_text).split('\n')[0]
                : '',
            };
          }
          return {
            dndId: item.orderId,
            text: item.front_text
              ? convert(item.front_text).split('\n')[0]
              : '',
          };
        })}></DndGroup>
    </>
  );
};

export default SideCard;
