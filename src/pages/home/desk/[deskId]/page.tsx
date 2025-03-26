import { useGetDeskQuery } from '@/api';
import { useParams } from 'react-router';
import DeskHearder from './DeskHearder';
import ListFlashcard from './ListFlashcard';

export default function DeskPage() {
  const { deskId } = useParams<{ deskId: string }>();

  const getDesk = useGetDeskQuery({ deskId });

  return (
    <div className="flex-1 overflow-y-scroll">
      {getDesk.isSuccess && getDesk.data.getDesk && (
        <>
          <DeskHearder
            deskInfo={{
              id: getDesk.data.getDesk.id,
              thumbnail: getDesk.data.getDesk.thumbnail!,
              name: getDesk.data.getDesk.name!,
              description: getDesk.data.getDesk.description!,
              numberOfFlashcards: getDesk.data.getDesk.flashcardQuantity!,
              icon: getDesk.data.getDesk.icon!,
              author: {
                name: getDesk.data.getDesk?.owner?.name,
                id: getDesk.data.getDesk?.owner?.id,
                avatarUrl: getDesk.data.getDesk?.owner?.avatar,
              },
            }}></DeskHearder>
          <ListFlashcard
            previewFlashcards={getDesk.data.getDesk.flashcards?.map((item) => {
              return {
                front: item?.front_text,
                back: item?.back_text,
                frontImage: item?.front_image,
                backImage: item?.back_image,
                id: item?.id,
              };
            })}></ListFlashcard>
        </>
      )}
    </div>
  );
}
