import { useGetDeskQuery } from '@/api';
import {
  setDeskInformation,
  setFlashcards,
} from '@/redux/store/editDesk.slice';
import { useAppDispatch } from '@/redux/store/ProtoStore.slice';
import { Progress } from '@heroui/react';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router';
import Header from './_header/Header';

export default function EditDeskVocabLayout() {
  const { deskId } = useParams<{ deskId: string }>();
  const dispatch = useAppDispatch();

  const GetDesk = useGetDeskQuery(
    { deskId: deskId ? deskId : '' },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (GetDesk.data?.getDesk) {
      const { getDesk } = GetDesk.data;
      dispatch(
        setDeskInformation({
          ...getDesk,
        })
      );

      if (getDesk.flashcards && deskId) {
        dispatch(
          setFlashcards(
            getDesk.flashcards
              .filter((c) => c !== null && c !== undefined)
              .map((item) => ({
                ...item,
                id: item.id,
                desk_id: deskId,
              }))
          )
        );
      }
    }
  }, []);

  return (
    <div className=" h-screen overflow-hidden min-w-full bg-background-deemphasized flex flex-col">
      {GetDesk.isFetching && (
        <Progress
          isIndeterminate
          aria-label="Loading..."
          className="max-w-full"
          size="sm"
        />
      )}

      {/* the header of the page is where User modify desk information, including how many card are there */}
      {!GetDesk.isFetching && <Header></Header>}
      {!GetDesk.isFetching && <Outlet></Outlet>}
    </div>
  );
}
