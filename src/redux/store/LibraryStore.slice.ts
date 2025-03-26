import { Desk } from '@/api/user service/graphql/types.generated';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface LibraryListItem {
//   thumbnailUrl: string;
//   name: string;
//   numberOfWords: number;
//   numberOfFlashcards: number;
//   author: {
//     name: string;
//     avatarUrl: string;
//   };
//   publicDate: string;
//   createdAt?: Desk['createdAt'];
// }

interface LibraryListProps {
  libraryList: (Desk | null)[];
  deskLimit: number;
}

const initialState: LibraryListProps = {
  libraryList: [],
  deskLimit: 20,
};

export const LibrarySlice = createSlice({
  initialState,
  name: 'library',
  reducers: {
    setLibraryList: (
      state,
      payload: PayloadAction<LibraryListProps['libraryList']>
    ) => {
      state.libraryList = payload.payload;
    },
  },
});

export const { setLibraryList } = LibrarySlice.actions;

export default LibrarySlice.reducer;
