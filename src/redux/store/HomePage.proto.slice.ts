import { Desk, SearchDesksQueryVariables } from '@/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SideBar {
  isOpen: boolean;
}

interface SearchDeskProps {
  searchTerm?: string;
  deskList?: Desk;
  searchOptions: SearchDesksQueryVariables;
  searchDelay: number;
}

interface HomePage {
  sidebar: SideBar;
  searchDesk: SearchDeskProps;
}
const initialState: HomePage = {
  sidebar: {
    isOpen: false,
  },
  searchDesk: {
    searchDelay: 1000,
    searchOptions: {
      searchArg: {
        isRandom: true,
        randomScore: Math.random().toString(),
      },
      skip: 0,
      limit: 30,
    },
  },
};

export const HomePageProtoSlice = createSlice({
  initialState,
  name: 'HomePageProtoSlice',
  reducers: {
    toggleSideBar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    setSearchOption: (
      state,
      payload: PayloadAction<SearchDeskProps['searchOptions']>
    ) => {
      state.searchDesk.searchOptions = payload.payload;
    },
  },
});

export const { toggleSideBar, setSearchOption } = HomePageProtoSlice.actions;
export default HomePageProtoSlice.reducer;
