import { faker } from "@faker-js/faker";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  review_result?: "bad" | "good" | "default";
}

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
      review_result: "default",
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
  name: "reviewFlashcardSlice",
  reducers: {
    setCurrentFlashcardIndex: (state, action) => {
      state.currentFlashcardIndex = action.payload;
    },
    updateReviewResultWithIndex: (
      state,
      action: PayloadAction<Pick<FlashCardType, "index" | "review_result">>
    ) => {
      state.flashcards[action.payload.index].review_result =
        action.payload.review_result;
    },
  },
});

export const { setCurrentFlashcardIndex, updateReviewResultWithIndex } =
  reviewFlashcardSlice.actions;

export default reviewFlashcardSlice.reducer;
