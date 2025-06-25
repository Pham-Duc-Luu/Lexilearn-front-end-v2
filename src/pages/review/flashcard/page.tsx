import { useGetDeskNeedReviewFlashcardQuery } from '@/api';
import { useReviewFlashMutation } from '@/api/user service/flashcard.api';
import { Confetti, ConfettiRef } from '@/components/magicui/confetti';
import { FlashCardType } from '@/redux/store/ReviewFlashcard.slice';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { FlipCardList } from '../../../components/FlipCard/FlipCard';
import Header from './Header';

export default function ReviewFlashcardPage() {
  const params = useParams<{ deskId: string }>();
  const getNeedReviewFlashcards = useGetDeskNeedReviewFlashcardQuery(
    {
      deskId: Number(params.deskId),
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [reviewFlashcardMutationTrigger, useviewFlashMutationResult] =
    useReviewFlashMutation();

  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    // * when the need-to-review cards fetched
    if (!getNeedReviewFlashcards.isFetching) {
      // * if those cards is not exist then set isFinish = true
      if (
        getNeedReviewFlashcards.data?.getDeskNeedReviewFlashcard?.flashcards
          ?.length === 0 ||
        !getNeedReviewFlashcards.data?.getDeskNeedReviewFlashcard?.flashcards
      ) {
        setIsFinish(true);
      }

      // * if the current index === the cards's length
      if (
        currentFlashcardIndex ===
        getNeedReviewFlashcards.data?.getDeskNeedReviewFlashcard?.flashcards
          ?.length
      ) {
        setIsFinish(true);
      }
    }
  }, [currentFlashcardIndex, getNeedReviewFlashcards]);

  const confettiRef = useRef<ConfettiRef>(null);

  return (
    <>
      <Header
        currentFlashcardIndex={currentFlashcardIndex}
        total={
          getNeedReviewFlashcards.data?.getDeskNeedReviewFlashcard?.flashcards
            ?.length
        }></Header>
      <div className=" content-center h-full flex justify-center items-center overflow-hidden">
        {!getNeedReviewFlashcards.isFetching && (
          <>
            {!isFinish &&
              !getNeedReviewFlashcards.isFetching &&
              getNeedReviewFlashcards.data?.getDeskNeedReviewFlashcard
                ?.flashcards && (
                <FlipCardList
                  startIndex={0}
                  onIndexChange={(e) => setCurrentFlashcardIndex(e)}
                  onFlashcardReviewOption={(e) => {
                    let grade;
                    switch (e.review_result) {
                      case 'good':
                        grade = 5;
                        break;

                      case 'ok':
                        grade = 4;
                        break;
                      case 'bad':
                        grade = 2;
                        break;
                      default:
                        grade = 4;
                        break;
                    }

                    reviewFlashcardMutationTrigger({
                      flashcard_id: e.id.toString(),
                      grade,
                    });
                  }}
                  flashcards={getNeedReviewFlashcards.data?.getDeskNeedReviewFlashcard?.flashcards?.reduce(
                    (acc, item, index) => {
                      if (!item) return acc; // skip null or undefined items

                      acc.push({
                        id: Number(item.id),
                        index,
                        review_result: 'default' as const,
                        front_sound: item.front_sound ?? undefined,
                        front_text: item.front_text!,
                        back_text: item.back_text ?? '',
                        back_sound: item.back_sound ?? undefined,
                        front_image: item.front_image ?? '',
                        back_image: item.back_image ?? '',
                      });

                      return acc;
                    },
                    [] as FlashCardType[]
                  )}></FlipCardList>
              )}
            {isFinish && (
              <>
                <div className="relative h-[500px] content-center text-7xl ">
                  You have reviewed all of the flashcards
                  <Confetti
                    ref={confettiRef}
                    className="absolute left-0 top-0 z-0 size-full"
                    onMouseEnter={() => {
                      confettiRef.current?.fire({});
                    }}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
