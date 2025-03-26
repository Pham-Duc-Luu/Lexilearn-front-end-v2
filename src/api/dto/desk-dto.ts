export interface ICreateDesRequestDto {
  deskName: string;
  deskDescription?: string;
  deskThumbnail?: string;
  deskIcon?: string;
  deskIsPublic?: boolean;
}

export interface ICreateDeskResponseDto {
  deskId: number;
  deskName: string;
  deskDescription: string;
  deskThumbnail: string;
  deskIcon: string;
  deskIsPublic: boolean;
}
