import { useGetDeskQuery } from '@/api';
import {
  EditDeskSlice,
  setDeskInformation,
} from '@/redux/store/editDesk.slice';
import { useAppDispatch } from '@/redux/store/ProtoStore.slice';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router';
import { v4 } from 'uuid';
import Header from './_header/Header';

export default function EditDeskVocabLayout() {
  const { deskId } = useParams<{ deskId: string }>();
  const dispatch = useAppDispatch();
  const GetDesk = useGetDeskQuery({ deskId });

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
          EditDeskSlice.actions.setFlashcards(
            getDesk.flashcards?.map((item) => ({
              ...item,
              orderId: v4(),
              desk_id: deskId,
            }))
          )
        );
      }
    }
  }, [GetDesk]);

  return (
    <div className=" h-screen overflow-hidden min-w-full bg-background-deemphasized flex flex-col">
      {GetDesk.isSuccess && <Header></Header>}
      <Outlet></Outlet>
    </div>
  );
}
