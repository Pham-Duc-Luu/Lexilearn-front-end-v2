import { faker } from '@faker-js/faker';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface IAuthor {
  name?: string;
  id?: string | number;
  avatarUrl?: string;
}

export interface IPreviewFlashcard {
  front: string;
  back: string;
  id?: string | number;
  frontImage?: string;
  backImage?: string;
}

export interface IDeskInformation {
  id?: string | number;
  thumbnail?: string;
  name: string;
  description?: string;
  numberOfFlashcards?: number;
  icon?: string;
  author?: IAuthor;
}

export interface IDesk {
  deskInfo: IDeskInformation;
  previewFlashcards?: IPreviewFlashcard[];
}

const initialState: IDesk = {
  deskInfo: {
    thumbnail: faker.image.urlPicsumPhotos(),
    id: faker.number.int(),
    name: faker.book.title(),
    description: faker.lorem.paragraph(),
    numberOfFlashcards: 0,
    icon: faker.image.avatar(),
    author: {
      name: faker.person.fullName(),
      id: faker.number.int(),
      avatarUrl: faker.image.avatar(),
    },
  },
  previewFlashcards: Array.from({ length: 10 }, (_, i) => {
    return {
      front: faker.lorem.word(),
      back: faker.lorem.word(),
      frontImage: faker.image.urlPicsumPhotos(),
      backImage: faker.image.urlPicsumPhotos(),
    };
  }),
};

export const DeskProtoSlice = createSlice({
  initialState,
  name: 'deskProtoSlice',
  reducers: {
    setDeskInfo: (state, payload: PayloadAction) => {},
  },
});

export default DeskProtoSlice.reducer;
export const { setDeskInfo } = DeskProtoSlice.actions;
