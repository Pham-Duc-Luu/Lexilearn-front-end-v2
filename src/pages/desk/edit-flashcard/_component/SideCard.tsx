import {
  removeFlashcard,
  setCurrFlashcardPositionId,
  setFlashcards,
} from '@/redux/store/editDesk.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store/ProtoStore.slice';
import { arrayMove } from '@dnd-kit/sortable';
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
        onSelect={(dndId) => dispatch(setCurrFlashcardPositionId(dndId))}
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
        items={flashcards.map((item) => ({
          dndId: item.orderId,
          text: item.front_text ? item.front_text : '',
        }))}></DndGroup>
    </>
  );
};

export default SideCard;
