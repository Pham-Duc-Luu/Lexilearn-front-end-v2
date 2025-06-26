import { DeskStatus, GetDeskQuery } from '@/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import lodash from 'lodash';
import { v4 } from 'uuid';

export interface EditDeskInterface {
  deskInformation: Pick<
    NonNullable<GetDeskQuery['getDesk']>,
    | 'id'
    | 'name'
    | 'description'
    | 'icon'
    | 'isPublic'
    | 'ownerId'
    | 'owner'
    | 'createdAt'
    | 'updatedAt'
    | 'status'
    | 'thumbnail'
    | 'flashcards'
  >;
  currFlashcardPositionId?: string;
  isCurCardFullfill: boolean;
  flashcards: NonNullable<
    NonNullable<NonNullable<GetDeskQuery['getDesk']>['flashcards']>[number] & {
      isStored?: boolean;
    }
  >[];
}

const initialState: EditDeskInterface = {
  flashcards: [],
  isCurCardFullfill: false,
  deskInformation: {
    id: 'desk-001',
    name: 'Basic Vocabulary',
    description: 'A set of basic vocabulary flashcards for beginners.',
    icon: '📘',
    isPublic: true,
    ownerId: 'user-123',
    owner: null, // Replace with mock user if available
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: DeskStatus.Drafted,
  },
};

const IsCardFullfill = (card: EditDeskInterface['flashcards'][0]) => {
  if (
    card &&
    card.back_text &&
    card.back_text.length > 0 &&
    card.front_text &&
    card.front_text.length > 0
  ) {
    return true;
  }
  return false;
};

export const EditDeskSlice = createSlice({
  initialState,
  name: 'editDesk',
  reducers: (create) => ({
    setDeskInformation: (
      state,
      payload: PayloadAction<EditDeskInterface['deskInformation']>
    ) => {
      if (payload.payload && !payload.payload?.name) {
        payload.payload = {
          ...payload.payload,
          name: 'Untitled Desk',
        };
      }
      state.deskInformation = payload.payload;
    },
    setFlashcards: (
      state,
      payload: PayloadAction<EditDeskInterface['flashcards']>
    ) => {
      state.flashcards = payload.payload;
    },
    initNewCardAtEnd: (state) => {
      if (state.isCurCardFullfill) {
        const newTempItem = {
          id: v4(),
          front_text: '',
          back_text: '',
          isStored: false,
        };

        state.flashcards.push(newTempItem);
        state.currFlashcardPositionId = newTempItem.id;

        // * after init => the current card will be not fullfill
        state.isCurCardFullfill = false;
      }
    },
    initNewFlashcard: (state) => {
      if (state.isCurCardFullfill) {
        if (state.flashcards && state.deskInformation?.id) {
          const index = state.flashcards.findIndex(
            (item) => item.id === state.currFlashcardPositionId
          );

          const newTempItem = {
            id: v4(),
            front_text: '',
            back_text: '',
            isStored: false,
          };
          state.flashcards.splice(index + 1, 0, newTempItem);

          state.currFlashcardPositionId = newTempItem.id;
        }
      }
    },
    updateFlashcard: (
      state,
      payload: PayloadAction<EditDeskInterface['flashcards'][0]>
    ) => {
      const currentCardItemIndex = lodash.findIndex(
        state.flashcards,
        function (o) {
          return o.id === payload.payload.id;
        }
      );
      // IMPORTANT: only update when find the card with id
      if (currentCardItemIndex >= 0) {
        state.flashcards[currentCardItemIndex] = payload.payload;
      }
    },
    // * init the first card to display

    initCurrCard: (state) => {
      // * if desk have already have flascards => take the first on
      if (state.flashcards && state.flashcards.length > 0) {
        state.currFlashcardPositionId = state.flashcards[0].id;
        // * assume that the flashcard that query from backend is fullfill
        state.isCurCardFullfill = true;
      } else {
        const newTempItem = {
          id: v4(),
          front_text: '',
          back_text: '',
          isStored: false,
        };

        state.flashcards.push(newTempItem);
        state.currFlashcardPositionId = newTempItem.id;

        // * after init => the current card will be not fullfill
        state.isCurCardFullfill = false;
      }
    },
    // * this will update the current main card
    // *  => the previous card is modified, and need to be check
    setCurrFlashcardPositionId: (
      state,
      payload: PayloadAction<EditDeskInterface['currFlashcardPositionId']>
    ) => {
      // * proccess the current card before update the next card }
      if (state.isCurCardFullfill) {
        state.currFlashcardPositionId = payload.payload;
      }

      // * after set the current card , check if that card is fullfill
      const currCard = lodash.find(
        state.flashcards,
        (o) => o.id === state.currFlashcardPositionId
      );
      if (currCard) {
        if (IsCardFullfill(currCard)) {
          state.isCurCardFullfill = true;
        } else {
          state.isCurCardFullfill = true;
        }
      }
    },
    removeFlashcard: (state, payload: PayloadAction<string>) => {
      const indexToRemove = state.flashcards.findIndex(
        (item) => item.id === payload.payload
      );

      if (indexToRemove !== -1) {
        // Remove the flashcard
        lodash.remove(state.flashcards, (item) => item.id === payload.payload);

        // Update currFlashcardPositionId to the previous item, if it exists
        const newIndex = indexToRemove - 1;
        if (newIndex >= 0) {
          state.currFlashcardPositionId = state.flashcards[newIndex].id;
        } else {
          // If there's no item before, optionally set it to the first item's id or undefined
          state.currFlashcardPositionId = state.flashcards[0]?.id ?? undefined;
        }
      }
    },
  }),
});

export const {
  setDeskInformation,
  initNewFlashcard,
  setCurrFlashcardPositionId,
  removeFlashcard,
  setFlashcards,
  updateFlashcard,
  initCurrCard,
  initNewCardAtEnd,
} = EditDeskSlice.actions;
export default EditDeskSlice.reducer;
