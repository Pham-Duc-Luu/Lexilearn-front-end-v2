import { faker } from '@faker-js/faker';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FlashCardType {
  id: number;
  front_text: string;
  back_text: string;
  front_image?: string;
  back_image?: string;
  front_sound?: string;
  back_example?: string;
  back_sound?: string;
  index: number;
  review_result?: 'bad' | 'ok' | 'good' | 'default';
}

export const CaculateInterval = (
  {
    easinessFactor,
    count,
    interval,
  }: {
    easinessFactor: number;
    count: number;
    interval: number;
  },
  grade: 1 | 2 | 3 | 4 | 5
) => {
  if (grade >= 3) {
    // Update the interval and next review date
    if (count == 1) {
      return 1; // For the first review, the interval is 1 day
    } else if (count == 2) {
      interval = 6; // After the second review, the interval is 6 days
    } else {
      return interval * easinessFactor; // Update the interval with the easiness factor
    }
  } else {
    return 1;
  }
};

export interface ReviewFlashcardSlice {
  flashcards: FlashCardType[];
  currentFlashcardIndex: number;
}

const initialState: ReviewFlashcardSlice = {
  currentFlashcardIndex: 0,
  flashcards: Array.from({ length: 40 }, (card, index) => {
    return {
      id: 1,
      index,
      review_result: 'default',
      front_text: faker.word.sample(),
      back_text: faker.word.sample(),
      back_example: faker.lorem.paragraph(),
      front_image: faker.image.urlPicsumPhotos(),
      back_image: faker.image.urlPicsumPhotos(),
    };
  }),
};

const reviewFlashcardSlice = createSlice({
  initialState,
  name: 'reviewFlashcardSlice',
  reducers: {
    setFlashcards: (
      state,
      payload: PayloadAction<ReviewFlashcardSlice['flashcards']>
    ) => {
      state.flashcards = payload.payload;
    },
    setCurrentFlashcardIndex: (state, action) => {
      state.currentFlashcardIndex = action.payload;
    },
    updateReviewResultWithIndex: (
      state,
      action: PayloadAction<Pick<FlashCardType, 'index' | 'review_result'>>
    ) => {
      state.flashcards[action.payload.index].review_result =
        action.payload.review_result;
    },
  },
});

export const {
  setCurrentFlashcardIndex,
  updateReviewResultWithIndex,
  setFlashcards,
} = reviewFlashcardSlice.actions;

export default reviewFlashcardSlice.reducer;
