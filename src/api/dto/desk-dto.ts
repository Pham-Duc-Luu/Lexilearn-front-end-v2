export interface ICreateDesRequestDto {
  deskName: string;
  deskDescription?: string;
  deskThumbnail?: string;
  deskIcon?: string;
  deskIsPublic?: boolean;
}

export interface ICreateDeskResponseDto {
  desk_id: number;
  desk_name: string;
  desk_description: string;
  deskThumbnail: string;
  deskIcon: string;
  desk_is_public: boolean;
}

export interface PatchUpdateDeskDto {
  desk_description: string;
  desk_thumbnail: string;
  desk_icon: string;
  desk_is_public: boolean;
  desk_name: string;
  desk_status: string;
}

export interface IPatchUpdateDeskRequestDto {
  deskId: number;
  data: Partial<PatchUpdateDeskDto>;
}

export interface DeskDto {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  icon: string;
  isPublic: boolean;
  ownerId: string;
  owner: null; // You can replace `any` with a more specific type if known
  createdAt: string; // ISO 8601 string; consider using `Date` if you parse it
  updatedAt: string;
  status: 'DRAFTED' | 'PUBLISHED' | 'BIN'; // Add other possible statuses if known
  flashcardPaginationResult?: null; // Replace `any` with actual pagination result type if available
  flashcards?: null; // Replace `any` with the actual flashcard type if defined
}
