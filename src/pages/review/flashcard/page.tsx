import { useGetDeskNeedReviewFlashcardQuery } from '@/api';
import { useAppDispatch } from '@/redux/store/ProtoStore.slice';
import { setFlashcards } from '@/redux/store/ReviewFlashcard.slice';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { FlipCardList } from './FlipCard';

export default function ReviewFlashcard() {
  const params = useParams<{ deskId: string }>();
  const getNeedReviewFlashcards = useGetDeskNeedReviewFlashcardQuery({
    deskId: Number(params.deskId),
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (getNeedReviewFlashcards.data?.getDeskNeedReviewFlashcard?.flashcards)
      dispatch(
        setFlashcards(
          getNeedReviewFlashcards.data?.getDeskNeedReviewFlashcard?.flashcards.map(
            (item, index) => ({
              id: 1,
              index,
              review_result: 'default',
              front_text: item?.front_text ? item?.front_text : '',
              back_text: item?.back_text ? item?.back_text : '',
              front_image: item?.front_image ? item?.front_image : '',
              back_image: item?.back_image ? item?.back_image : '',
            })
          )
        )
      );
  }, [getNeedReviewFlashcards]);

  return (
    <div className=" content-center h-full flex justify-center items-center">
      <FlipCardList></FlipCardList>
    </div>
  );
}
