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
