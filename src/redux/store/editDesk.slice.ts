import { CreateOrUpdateFlashcardInput, UpdateDesk } from '@/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import lodash from 'lodash';
import { v4 } from 'uuid';
export interface EditDeskInterface {
  deskInformation?: UpdateDesk;
  currFlashcardPositionId?: string;
  flashcards: (CreateOrUpdateFlashcardInput & { orderId: string })[];
}

const initialState: EditDeskInterface = {
  flashcards: [],
};

export const EditDeskSlice = createSlice({
  initialState,
  name: 'editDesk',
  reducers: {
    setDeskInformation: (
      state,
      payload: PayloadAction<EditDeskInterface['deskInformation']>
    ) => {
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
        state.flashcards.push({
          orderId: v4(),
          front_text: '',
          back_text: '',
          desk_id: state.deskInformation?.id,
        });
      }

      state.currFlashcardPositionId =
        state.flashcards[state.flashcards.length - 1].orderId;
    },
    updateFlashcard: (
      state,
      payload: PayloadAction<EditDeskInterface['flashcards'][0]>
    ) => {
      const currentCardItemIndex = lodash.findIndex(
        state.flashcards,
        function (o) {
          return o.orderId === payload.payload.orderId;
        }
      );
      // IMPORTANT: only update when find the card with id
      if (currentCardItemIndex >= 0) {
        state.flashcards[currentCardItemIndex] = payload.payload;
      }
    },
    setCurrFlashcardPositionId: (
      state,
      payload: PayloadAction<EditDeskInterface['currFlashcardPositionId']>
    ) => {
      state.currFlashcardPositionId = payload.payload;
    },
    removeFlashcard: (state, payload: PayloadAction<string>) => {
      lodash.remove(
        state.flashcards,
        (item) => item.orderId === payload.payload
      );
    },
  },
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
