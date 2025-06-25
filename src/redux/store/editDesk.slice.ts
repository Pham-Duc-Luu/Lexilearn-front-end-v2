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
  flashcards: NonNullable<
    NonNullable<NonNullable<GetDeskQuery['getDesk']>['flashcards']>[number] & {
      isStored?: boolean;
    }
  >[];
}

const initialState: EditDeskInterface = {
  flashcards: [],
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

    initNewFlashcard: (state) => {
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

    // * this will update the current main card
    // *  => the previous card is modified, and need to be check
    setCurrFlashcardPositionId: (
      state,
      payload: PayloadAction<EditDeskInterface['currFlashcardPositionId']>
    ) => {
      // * proccess the current card before update the next card }

      state.currFlashcardPositionId = payload.payload;
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
} = EditDeskSlice.actions;
export default EditDeskSlice.reducer;
