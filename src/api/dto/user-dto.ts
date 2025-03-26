export type SuccessResponseDto<T> = Partial<{
  timestamp: string;
  status: number;
  metadata: T;
  message: string;
  path: string;
}>;

export type UserProfileMetadata = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  thumbnail: string;
};

export type PatchUserProfileRequestDto = {
  name: string;
  avatar: string;
  thumbnail: string;
};
