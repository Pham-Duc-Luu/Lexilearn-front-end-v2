import { baseApiWithGraphql } from './baseApi';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  _FieldSet: { input: any; output: any; }
};

export type AvatarProperty = {
  __typename?: 'AvatarProperty';
  bgColor?: Maybe<Scalars['String']['output']>;
  earSize?: Maybe<EarSize>;
  eyeBrowStyle?: Maybe<EyeBrowStyle>;
  eyeStyle?: Maybe<EyeStyle>;
  faceColor?: Maybe<Scalars['String']['output']>;
  glassesStyle?: Maybe<GlassesStyle>;
  hairColor?: Maybe<Scalars['String']['output']>;
  hairStyle?: Maybe<HairStyle>;
  hatColor?: Maybe<Scalars['String']['output']>;
  hatStyle?: Maybe<HatStyle>;
  mouthStyle?: Maybe<MouthStyle>;
  noseStyle?: Maybe<NoseStyle>;
  sex?: Maybe<Sex>;
  shirtColor?: Maybe<Scalars['String']['output']>;
  shirtStyle?: Maybe<ShirtStyle>;
};

export type AvatarPropertyInput = {
  bgColor?: InputMaybe<Scalars['String']['input']>;
  earSize?: InputMaybe<EarSize>;
  eyeBrowStyle?: InputMaybe<EyeBrowStyle>;
  eyeStyle?: InputMaybe<EyeStyle>;
  faceColor?: InputMaybe<Scalars['String']['input']>;
  glassesStyle?: InputMaybe<GlassesStyle>;
  hairColor?: InputMaybe<Scalars['String']['input']>;
  hairStyle?: InputMaybe<HairStyle>;
  hatColor?: InputMaybe<Scalars['String']['input']>;
  hatStyle?: InputMaybe<HatStyle>;
  mouthStyle?: InputMaybe<MouthStyle>;
  noseStyle?: InputMaybe<NoseStyle>;
  sex?: InputMaybe<Sex>;
  shirtColor?: InputMaybe<Scalars['String']['input']>;
  shirtStyle?: InputMaybe<ShirtStyle>;
};

export type CreateFlashcardInput = {
  back_image?: InputMaybe<Scalars['String']['input']>;
  back_sound?: InputMaybe<Scalars['String']['input']>;
  back_text?: InputMaybe<Scalars['String']['input']>;
  desk_id: Scalars['ID']['input'];
  front_image?: InputMaybe<Scalars['String']['input']>;
  front_sound?: InputMaybe<Scalars['String']['input']>;
  front_text?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOrUpdateFlashcardInput = {
  back_image?: InputMaybe<Scalars['String']['input']>;
  back_sound?: InputMaybe<Scalars['String']['input']>;
  back_text?: InputMaybe<Scalars['String']['input']>;
  desk_id: Scalars['ID']['input'];
  front_image?: InputMaybe<Scalars['String']['input']>;
  front_sound?: InputMaybe<Scalars['String']['input']>;
  front_text?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Desk = {
  __typename?: 'Desk';
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  flashcardQuantity?: Maybe<Scalars['Int']['output']>;
  flashcards?: Maybe<Array<Maybe<Flashcard>>>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<User>;
  ownerId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<DeskStatus>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type DeskPaginationResult = {
  __typename?: 'DeskPaginationResult';
  desks?: Maybe<Array<Maybe<Desk>>>;
  limit?: Maybe<Scalars['Int']['output']>;
  skip?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type DeskQueryFilter = {
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<DeskStatus>;
};

export type DeskQuerySort = {
  field?: InputMaybe<DeskSortField>;
  order?: InputMaybe<SortOrder>;
};

export enum DeskSortField {
  CreatedAt = 'createdAt',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export enum DeskStatus {
  Bin = 'BIN',
  Drafted = 'DRAFTED',
  Published = 'PUBLISHED'
}

export enum EarSize {
  Big = 'BIG',
  Small = 'SMALL'
}

export enum ErrorDetail {
  /**
   * The deadline expired before the operation could complete.
   *
   * For operations that change the state of the system, this error
   * may be returned even if the operation has completed successfully.
   * For example, a successful response from a server could have been
   * delayed long enough for the deadline to expire.
   *
   * HTTP Mapping: 504 Gateway Timeout
   * Error Type: UNAVAILABLE
   */
  DeadlineExceeded = 'DEADLINE_EXCEEDED',
  /**
   * The server detected that the client is exhibiting a behavior that
   * might be generating excessive load.
   *
   * HTTP Mapping: 429 Too Many Requests or 420 Enhance Your Calm
   * Error Type: UNAVAILABLE
   */
  EnhanceYourCalm = 'ENHANCE_YOUR_CALM',
  /**
   * The requested field is not found in the schema.
   *
   * This differs from `NOT_FOUND` in that `NOT_FOUND` should be used when a
   * query is valid, but is unable to return a result (if, for example, a
   * specific video id doesn't exist). `FIELD_NOT_FOUND` is intended to be
   * returned by the server to signify that the requested field is not known to exist.
   * This may be returned in lieu of failing the entire query.
   * See also `PERMISSION_DENIED` for cases where the
   * requested field is invalid only for the given user or class of users.
   *
   * HTTP Mapping: 404 Not Found
   * Error Type: BAD_REQUEST
   */
  FieldNotFound = 'FIELD_NOT_FOUND',
  /**
   * The client specified an invalid argument.
   *
   * Note that this differs from `FAILED_PRECONDITION`.
   * `INVALID_ARGUMENT` indicates arguments that are problematic
   * regardless of the state of the system (e.g., a malformed file name).
   *
   * HTTP Mapping: 400 Bad Request
   * Error Type: BAD_REQUEST
   */
  InvalidArgument = 'INVALID_ARGUMENT',
  /**
   * The provided cursor is not valid.
   *
   * The most common usage for this error is when a client is paginating
   * through a list that uses stateful cursors. In that case, the provided
   * cursor may be expired.
   *
   * HTTP Mapping: 404 Not Found
   * Error Type: NOT_FOUND
   */
  InvalidCursor = 'INVALID_CURSOR',
  /**
   * Unable to perform operation because a required resource is missing.
   *
   * Example: Client is attempting to refresh a list, but the specified
   * list is expired. This requires an action by the client to get a new list.
   *
   * If the user is simply trying GET a resource that is not found,
   * use the NOT_FOUND error type. FAILED_PRECONDITION.MISSING_RESOURCE
   * is to be used particularly when the user is performing an operation
   * that requires a particular resource to exist.
   *
   * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
   * Error Type: FAILED_PRECONDITION
   */
  MissingResource = 'MISSING_RESOURCE',
  /**
   * Service Error.
   *
   * There is a problem with an upstream service.
   *
   * This may be returned if a gateway receives an unknown error from a service
   * or if a service is unreachable.
   * If a request times out which waiting on a response from a service,
   * `DEADLINE_EXCEEDED` may be returned instead.
   * If a service returns a more specific error Type, the specific error Type may
   * be returned instead.
   *
   * HTTP Mapping: 502 Bad Gateway
   * Error Type: UNAVAILABLE
   */
  ServiceError = 'SERVICE_ERROR',
  /**
   * Request failed due to network errors.
   *
   * HTTP Mapping: 503 Unavailable
   * Error Type: UNAVAILABLE
   */
  TcpFailure = 'TCP_FAILURE',
  /**
   * Request throttled based on server concurrency limits.
   *
   * HTTP Mapping: 503 Unavailable
   * Error Type: UNAVAILABLE
   */
  ThrottledConcurrency = 'THROTTLED_CONCURRENCY',
  /**
   * Request throttled based on server CPU limits
   *
   * HTTP Mapping: 503 Unavailable.
   * Error Type: UNAVAILABLE
   */
  ThrottledCpu = 'THROTTLED_CPU',
  /**
   * The operation is not implemented or is not currently supported/enabled.
   *
   * HTTP Mapping: 501 Not Implemented
   * Error Type: BAD_REQUEST
   */
  Unimplemented = 'UNIMPLEMENTED',
  /**
   * Unknown error.
   *
   * This error should only be returned when no other error detail applies.
   * If a client sees an unknown errorDetail, it will be interpreted as UNKNOWN.
   *
   * HTTP Mapping: 500 Internal Server Error
   */
  Unknown = 'UNKNOWN'
}

export enum ErrorType {
  /**
   * Bad Request.
   *
   * There is a problem with the request.
   * Retrying the same request is not likely to succeed.
   * An example would be a query or argument that cannot be deserialized.
   *
   * HTTP Mapping: 400 Bad Request
   */
  BadRequest = 'BAD_REQUEST',
  /**
   * The operation was rejected because the system is not in a state
   * required for the operation's execution.  For example, the directory
   * to be deleted is non-empty, an rmdir operation is applied to
   * a non-directory, etc.
   *
   * Service implementers can use the following guidelines to decide
   * between `FAILED_PRECONDITION` and `UNAVAILABLE`:
   *
   * - Use `UNAVAILABLE` if the client can retry just the failing call.
   * - Use `FAILED_PRECONDITION` if the client should not retry until
   * the system state has been explicitly fixed.  E.g., if an "rmdir"
   *      fails because the directory is non-empty, `FAILED_PRECONDITION`
   * should be returned since the client should not retry unless
   * the files are deleted from the directory.
   *
   * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
   */
  FailedPrecondition = 'FAILED_PRECONDITION',
  /**
   * Internal error.
   *
   * An unexpected internal error was encountered. This means that some
   * invariants expected by the underlying system have been broken.
   * This error code is reserved for serious errors.
   *
   * HTTP Mapping: 500 Internal Server Error
   */
  Internal = 'INTERNAL',
  /**
   * The requested entity was not found.
   *
   * This could apply to a resource that has never existed (e.g. bad resource id),
   * or a resource that no longer exists (e.g. cache expired.)
   *
   * Note to server developers: if a request is denied for an entire class
   * of users, such as gradual feature rollout or undocumented allowlist,
   * `NOT_FOUND` may be used. If a request is denied for some users within
   * a class of users, such as user-based access control, `PERMISSION_DENIED`
   * must be used.
   *
   * HTTP Mapping: 404 Not Found
   */
  NotFound = 'NOT_FOUND',
  /**
   * The caller does not have permission to execute the specified
   * operation.
   *
   * `PERMISSION_DENIED` must not be used for rejections
   * caused by exhausting some resource or quota.
   * `PERMISSION_DENIED` must not be used if the caller
   * cannot be identified (use `UNAUTHENTICATED`
   * instead for those errors).
   *
   * This error Type does not imply the
   * request is valid or the requested entity exists or satisfies
   * other pre-conditions.
   *
   * HTTP Mapping: 403 Forbidden
   */
  PermissionDenied = 'PERMISSION_DENIED',
  /**
   * The request does not have valid authentication credentials.
   *
   * This is intended to be returned only for routes that require
   * authentication.
   *
   * HTTP Mapping: 401 Unauthorized
   */
  Unauthenticated = 'UNAUTHENTICATED',
  /**
   * Currently Unavailable.
   *
   * The service is currently unavailable.  This is most likely a
   * transient condition, which can be corrected by retrying with
   * a backoff.
   *
   * HTTP Mapping: 503 Unavailable
   */
  Unavailable = 'UNAVAILABLE',
  /**
   * Unknown error.
   *
   * For example, this error may be returned when
   * an error code received from another address space belongs to
   * an error space that is not known in this address space.  Also
   * errors raised by APIs that do not return enough error information
   * may be converted to this error.
   *
   * If a client sees an unknown errorType, it will be interpreted as UNKNOWN.
   * Unknown errors MUST NOT trigger any special behavior. These MAY be treated
   * by an implementation as being equivalent to INTERNAL.
   *
   * When possible, a more specific error should be provided.
   *
   * HTTP Mapping: 520 Unknown Error
   */
  Unknown = 'UNKNOWN'
}

export enum EyeBrowStyle {
  Up = 'UP',
  UpWoman = 'UP_WOMAN'
}

export enum EyeStyle {
  Circle = 'CIRCLE',
  Oval = 'OVAL',
  Smile = 'SMILE'
}

export type Flashcard = {
  __typename?: 'Flashcard';
  SM?: Maybe<Sm>;
  back_image?: Maybe<Scalars['String']['output']>;
  back_sound?: Maybe<Scalars['String']['output']>;
  back_text?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['String']['output']>;
  front_image?: Maybe<Scalars['String']['output']>;
  front_sound?: Maybe<Scalars['String']['output']>;
  front_text?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  updated_at?: Maybe<Scalars['String']['output']>;
};

export type FlashcardPaginationResult = {
  __typename?: 'FlashcardPaginationResult';
  flashcards?: Maybe<Array<Maybe<Flashcard>>>;
  limit?: Maybe<Scalars['Int']['output']>;
  skip?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export enum GlassesStyle {
  None = 'NONE',
  Round = 'ROUND',
  Square = 'SQUARE'
}

export enum HairStyle {
  Mohawk = 'MOHAWK',
  Normal = 'NORMAL',
  Thick = 'THICK',
  WomanLong = 'WOMAN_LONG',
  WomanShort = 'WOMAN_SHORT'
}

export enum HatStyle {
  Beanie = 'BEANIE',
  None = 'NONE',
  Turban = 'TURBAN'
}

export type ModifyUserProfileInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  bgColor?: InputMaybe<Scalars['String']['input']>;
  earSize?: InputMaybe<EarSize>;
  eyeBrowStyle?: InputMaybe<EyeBrowStyle>;
  eyeStyle?: InputMaybe<EyeStyle>;
  faceColor?: InputMaybe<Scalars['String']['input']>;
  glassesStyle?: InputMaybe<GlassesStyle>;
  hairColor?: InputMaybe<Scalars['String']['input']>;
  hairStyle?: InputMaybe<HairStyle>;
  hatColor?: InputMaybe<Scalars['String']['input']>;
  hatStyle?: InputMaybe<HatStyle>;
  mouthStyle?: InputMaybe<MouthStyle>;
  name?: InputMaybe<Scalars['String']['input']>;
  noseStyle?: InputMaybe<NoseStyle>;
  sex?: InputMaybe<Sex>;
  shirtColor?: InputMaybe<Scalars['String']['input']>;
  shirtStyle?: InputMaybe<ShirtStyle>;
};

export enum MouthStyle {
  Laugh = 'LAUGH',
  Peace = 'PEACE',
  Smile = 'SMILE'
}

/**  Mutation definitions */
export type Mutation = {
  __typename?: 'Mutation';
  /**  Create a single flashcard */
  createFlashcard: Flashcard;
  /**  Create multiple flashcards */
  createFlashcards: Scalars['Int']['output'];
  /**  delete a flashcard */
  deleteFlashcard: Scalars['ID']['output'];
  /**  re-order the flashcard in desk */
  newFlashcardOrder?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  /**  Update a single flashcard */
  updateFlashcard: Flashcard;
  /**  Update multiple flashcards */
  updateFlashcards: Scalars['Int']['output'];
  updateUserProfile?: Maybe<User>;
  /**  update flashcards in desks */
  userPrivateUpdateDeskAndFlashcards?: Maybe<Desk>;
};


/**  Mutation definitions */
export type MutationCreateFlashcardArgs = {
  input: CreateFlashcardInput;
};


/**  Mutation definitions */
export type MutationCreateFlashcardsArgs = {
  inputs: Array<CreateFlashcardInput>;
};


/**  Mutation definitions */
export type MutationDeleteFlashcardArgs = {
  deskId: Scalars['ID']['input'];
  flashcardId: Scalars['ID']['input'];
};


/**  Mutation definitions */
export type MutationNewFlashcardOrderArgs = {
  deskId: Scalars['ID']['input'];
  inputs: Array<Scalars['ID']['input']>;
};


/**  Mutation definitions */
export type MutationUpdateFlashcardArgs = {
  input: UpdateFlashcardInput;
};


/**  Mutation definitions */
export type MutationUpdateFlashcardsArgs = {
  inputs: Array<UpdateFlashcardInput>;
};


/**  Mutation definitions */
export type MutationUpdateUserProfileArgs = {
  input: ModifyUserProfileInput;
};


/**  Mutation definitions */
export type MutationUserPrivateUpdateDeskAndFlashcardsArgs = {
  desk: UpdateDesk;
  flashcards?: InputMaybe<Array<CreateOrUpdateFlashcardInput>>;
};

export enum NoseStyle {
  Long = 'LONG',
  Round = 'ROUND',
  Short = 'SHORT'
}

export type Query = {
  __typename?: 'Query';
  _service: _Service;
  getDesk?: Maybe<Desk>;
  /**  get the flashcard in a desk */
  getDeskFlashcards?: Maybe<FlashcardPaginationResult>;
  /**  get the flashcard need to be review */
  getDeskNeedReviewFlashcard?: Maybe<FlashcardPaginationResult>;
  getDesks?: Maybe<DeskPaginationResult>;
  getFlashcards?: Maybe<FlashcardPaginationResult>;
  getUserDesks?: Maybe<DeskPaginationResult>;
  getUserProfile?: Maybe<User>;
  searchDesk?: Maybe<DeskPaginationResult>;
  userPrivateSearchDesk?: Maybe<DeskPaginationResult>;
};


export type QueryGetDeskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetDeskFlashcardsArgs = {
  deskId: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetDeskNeedReviewFlashcardArgs = {
  deskId: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetDesksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<DeskQuerySort>;
};


export type QueryGetFlashcardsArgs = {
  deskId: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetUserDesksArgs = {
  filter?: InputMaybe<DeskQueryFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  searchArg?: InputMaybe<SearchDeskArg>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<DeskQuerySort>;
};


export type QuerySearchDeskArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  searchArg?: InputMaybe<SearchDeskArg>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserPrivateSearchDeskArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  searchArg?: InputMaybe<SearchDeskArg>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type Sm = {
  __typename?: 'SM';
  EF?: Maybe<Scalars['Float']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  interval?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nextDay?: Maybe<Scalars['String']['output']>;
};

export type SearchDeskArg = {
  isRandom?: InputMaybe<Scalars['Boolean']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  randomScore?: InputMaybe<Scalars['String']['input']>;
};

export enum Sex {
  Man = 'MAN',
  Woman = 'WOMAN'
}

export enum ShirtStyle {
  Hoody = 'HOODY',
  Polo = 'POLO',
  Short = 'SHORT'
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type UpdateDesk = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DeskStatus>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFlashcardInput = {
  back_image?: InputMaybe<Scalars['String']['input']>;
  back_sound?: InputMaybe<Scalars['String']['input']>;
  back_text?: InputMaybe<Scalars['String']['input']>;
  desk_id: Scalars['ID']['input'];
  front_image?: InputMaybe<Scalars['String']['input']>;
  front_sound?: InputMaybe<Scalars['String']['input']>;
  front_text?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  avatarProperty?: Maybe<AvatarProperty>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
};

export type _Service = {
  __typename?: '_Service';
  sdl: Scalars['String']['output'];
};

export type GetUserDesksQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<DeskQueryFilter>;
  sort?: InputMaybe<DeskQuerySort>;
  searchArg?: InputMaybe<SearchDeskArg>;
}>;


export type GetUserDesksQuery = { __typename?: 'Query', getUserDesks?: { __typename?: 'DeskPaginationResult', total?: number | null, skip?: number | null, limit?: number | null, desks?: Array<{ __typename?: 'Desk', id: string, name?: string | null, description?: string | null, icon?: string | null, isPublic?: boolean | null, ownerId?: string | null, thumbnail?: string | null, status?: DeskStatus | null, createdAt?: string | null, updatedAt?: string | null, flashcardQuantity?: number | null } | null> | null } | null };

export type GetDesksQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetDesksQuery = { __typename?: 'Query', getDesks?: { __typename?: 'DeskPaginationResult', total?: number | null, skip?: number | null, limit?: number | null, desks?: Array<{ __typename?: 'Desk', id: string, name?: string | null, description?: string | null, icon?: string | null, isPublic?: boolean | null, thumbnail?: string | null, flashcardQuantity?: number | null, owner?: { __typename?: 'User', id: string, name?: string | null, email?: string | null, avatar?: string | null, thumbnail?: string | null } | null } | null> | null } | null };

export type CreateFlashcardMutationVariables = Exact<{
  input: CreateFlashcardInput;
}>;


export type CreateFlashcardMutation = { __typename?: 'Mutation', createFlashcard: { __typename?: 'Flashcard', id: string, front_image?: string | null, front_text?: string | null, front_sound?: string | null, back_image?: string | null, back_text?: string | null, back_sound?: string | null, created_at?: string | null, updated_at?: string | null } };

export type CreateFlashcardsMutationVariables = Exact<{
  inputs: Array<CreateFlashcardInput> | CreateFlashcardInput;
}>;


export type CreateFlashcardsMutation = { __typename?: 'Mutation', createFlashcards: number };

export type UpdateFlashcardMutationVariables = Exact<{
  input: UpdateFlashcardInput;
}>;


export type UpdateFlashcardMutation = { __typename?: 'Mutation', updateFlashcard: { __typename?: 'Flashcard', id: string, front_image?: string | null, front_text?: string | null, front_sound?: string | null, back_image?: string | null, back_text?: string | null, back_sound?: string | null, created_at?: string | null, updated_at?: string | null } };

export type GetDeskFlashcardsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  deskId: Scalars['Int']['input'];
}>;


export type GetDeskFlashcardsQuery = { __typename?: 'Query', getDeskFlashcards?: { __typename?: 'FlashcardPaginationResult', total?: number | null, skip?: number | null, limit?: number | null, flashcards?: Array<{ __typename?: 'Flashcard', id: string, front_image?: string | null, front_text?: string | null, front_sound?: string | null, back_image?: string | null, back_text?: string | null, back_sound?: string | null, created_at?: string | null, updated_at?: string | null } | null> | null } | null };

export type SearchDesksQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  searchArg?: InputMaybe<SearchDeskArg>;
}>;


export type SearchDesksQuery = { __typename?: 'Query', searchDesk?: { __typename?: 'DeskPaginationResult', total?: number | null, skip?: number | null, limit?: number | null, desks?: Array<{ __typename?: 'Desk', id: string, name?: string | null, description?: string | null, icon?: string | null, isPublic?: boolean | null, ownerId?: string | null, thumbnail?: string | null, status?: DeskStatus | null, createdAt?: string | null, updatedAt?: string | null, flashcardQuantity?: number | null, owner?: { __typename?: 'User', id: string, name?: string | null, email?: string | null, avatar?: string | null, thumbnail?: string | null, provider?: string | null } | null } | null> | null } | null };

export type UserPrivateUpdateDeskAndFlashcardsMutationVariables = Exact<{
  desk: UpdateDesk;
  flashcards?: InputMaybe<Array<CreateOrUpdateFlashcardInput> | CreateOrUpdateFlashcardInput>;
}>;


export type UserPrivateUpdateDeskAndFlashcardsMutation = { __typename?: 'Mutation', userPrivateUpdateDeskAndFlashcards?: { __typename?: 'Desk', id: string, name?: string | null, description?: string | null, icon?: string | null, isPublic?: boolean | null, ownerId?: string | null, thumbnail?: string | null, status?: DeskStatus | null, createdAt?: string | null, updatedAt?: string | null, flashcardQuantity?: number | null } | null };

export type GetDeskQueryVariables = Exact<{
  deskId: Scalars['ID']['input'];
}>;


export type GetDeskQuery = { __typename?: 'Query', getDesk?: { __typename?: 'Desk', id: string, name?: string | null, description?: string | null, icon?: string | null, isPublic?: boolean | null, ownerId?: string | null, thumbnail?: string | null, status?: DeskStatus | null, createdAt?: string | null, updatedAt?: string | null, flashcardQuantity?: number | null, owner?: { __typename?: 'User', name?: string | null, email?: string | null, avatar?: string | null, thumbnail?: string | null, id: string } | null, flashcards?: Array<{ __typename?: 'Flashcard', id: string, front_image?: string | null, front_text?: string | null, front_sound?: string | null, back_image?: string | null, back_text?: string | null, back_sound?: string | null, created_at?: string | null, updated_at?: string | null } | null> | null } | null };

export type UpdateUserProfileMutationVariables = Exact<{
  input: ModifyUserProfileInput;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUserProfile?: { __typename?: 'User', id: string, name?: string | null, email?: string | null, avatar?: string | null, thumbnail?: string | null, provider?: string | null, avatarProperty?: { __typename?: 'AvatarProperty', sex?: Sex | null, faceColor?: string | null, earSize?: EarSize | null, eyeStyle?: EyeStyle | null, noseStyle?: NoseStyle | null, mouthStyle?: MouthStyle | null, shirtStyle?: ShirtStyle | null, glassesStyle?: GlassesStyle | null, hairColor?: string | null, hairStyle?: HairStyle | null, hatStyle?: HatStyle | null, hatColor?: string | null, eyeBrowStyle?: EyeBrowStyle | null, shirtColor?: string | null, bgColor?: string | null } | null } | null };

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProfileQuery = { __typename?: 'Query', getUserProfile?: { __typename?: 'User', id: string, name?: string | null, email?: string | null, avatar?: string | null, thumbnail?: string | null, provider?: string | null, avatarProperty?: { __typename?: 'AvatarProperty', sex?: Sex | null, faceColor?: string | null, earSize?: EarSize | null, eyeStyle?: EyeStyle | null, noseStyle?: NoseStyle | null, mouthStyle?: MouthStyle | null, shirtStyle?: ShirtStyle | null, glassesStyle?: GlassesStyle | null, hairColor?: string | null, hairStyle?: HairStyle | null, hatStyle?: HatStyle | null, hatColor?: string | null, eyeBrowStyle?: EyeBrowStyle | null, shirtColor?: string | null, bgColor?: string | null } | null } | null };

export type GetDeskNeedReviewFlashcardQueryVariables = Exact<{
  deskId: Scalars['Int']['input'];
}>;


export type GetDeskNeedReviewFlashcardQuery = { __typename?: 'Query', getDeskNeedReviewFlashcard?: { __typename?: 'FlashcardPaginationResult', total?: number | null, skip?: number | null, limit?: number | null, flashcards?: Array<{ __typename?: 'Flashcard', id: string, front_image?: string | null, front_text?: string | null, front_sound?: string | null, back_image?: string | null, back_text?: string | null, back_sound?: string | null, created_at?: string | null, updated_at?: string | null, SM?: { __typename?: 'SM', id: string, name?: string | null, count?: number | null, interval?: number | null, EF?: number | null, nextDay?: string | null } | null } | null> | null } | null };


export const GetUserDesksDocument = `
    query GetUserDesks($skip: Int = 0, $limit: Int = 30, $filter: DeskQueryFilter, $sort: DeskQuerySort, $searchArg: SearchDeskArg) {
  getUserDesks(
    skip: $skip
    limit: $limit
    filter: $filter
    sort: $sort
    searchArg: $searchArg
  ) {
    total
    skip
    limit
    desks {
      id
      name
      description
      icon
      isPublic
      ownerId
      thumbnail
      status
      createdAt
      updatedAt
      flashcardQuantity
    }
  }
}
    `;
export const GetDesksDocument = `
    query getDesks($skip: Int = 0, $limit: Int = 30) {
  getDesks(skip: $skip, limit: $limit) {
    total
    skip
    limit
    desks {
      id
      name
      description
      icon
      isPublic
      thumbnail
      owner {
        id
        name
        email
        avatar
        thumbnail
      }
      flashcardQuantity
    }
  }
}
    `;
export const CreateFlashcardDocument = `
    mutation createFlashcard($input: CreateFlashcardInput!) {
  createFlashcard(input: $input) {
    id
    front_image
    front_text
    front_sound
    back_image
    back_text
    back_sound
    created_at
    updated_at
  }
}
    `;
export const CreateFlashcardsDocument = `
    mutation CreateFlashcards($inputs: [CreateFlashcardInput!]!) {
  createFlashcards(inputs: $inputs)
}
    `;
export const UpdateFlashcardDocument = `
    mutation updateFlashcard($input: UpdateFlashcardInput!) {
  updateFlashcard(input: $input) {
    id
    front_image
    front_text
    front_sound
    back_image
    back_text
    back_sound
    created_at
    updated_at
  }
}
    `;
export const GetDeskFlashcardsDocument = `
    query GetDeskFlashcards($skip: Int = 0, $limit: Int = 30, $deskId: Int!) {
  getDeskFlashcards(deskId: $deskId, skip: $skip, limit: $limit) {
    total
    skip
    limit
    flashcards {
      id
      front_image
      front_text
      front_sound
      back_image
      back_text
      back_sound
      created_at
      updated_at
    }
  }
}
    `;
export const SearchDesksDocument = `
    query SearchDesks($skip: Int = 0, $limit: Int = 30, $searchArg: SearchDeskArg) {
  searchDesk(searchArg: $searchArg, skip: $skip, limit: $limit) {
    total
    skip
    desks {
      id
      name
      description
      icon
      isPublic
      ownerId
      thumbnail
      status
      createdAt
      updatedAt
      flashcardQuantity
      owner {
        id
        name
        email
        avatar
        thumbnail
        provider
      }
    }
    limit
  }
}
    `;
export const UserPrivateUpdateDeskAndFlashcardsDocument = `
    mutation UserPrivateUpdateDeskAndFlashcards($desk: UpdateDesk!, $flashcards: [CreateOrUpdateFlashcardInput!]) {
  userPrivateUpdateDeskAndFlashcards(desk: $desk, flashcards: $flashcards) {
    id
    name
    description
    icon
    isPublic
    ownerId
    thumbnail
    status
    createdAt
    updatedAt
    flashcardQuantity
  }
}
    `;
export const GetDeskDocument = `
    query GetDesk($deskId: ID!) {
  getDesk(id: $deskId) {
    id
    name
    description
    icon
    isPublic
    ownerId
    thumbnail
    status
    createdAt
    updatedAt
    owner {
      name
      email
      avatar
      thumbnail
      id
    }
    flashcardQuantity
    flashcards {
      id
      front_image
      front_text
      front_sound
      back_image
      back_text
      back_sound
      created_at
      updated_at
    }
  }
}
    `;
export const UpdateUserProfileDocument = `
    mutation UpdateUserProfile($input: ModifyUserProfileInput!) {
  updateUserProfile(input: $input) {
    id
    name
    email
    avatar
    thumbnail
    provider
    avatarProperty {
      sex
      faceColor
      earSize
      eyeStyle
      noseStyle
      mouthStyle
      shirtStyle
      glassesStyle
      hairColor
      hairStyle
      hatStyle
      hatColor
      eyeBrowStyle
      shirtColor
      bgColor
    }
  }
}
    `;
export const GetUserProfileDocument = `
    query GetUserProfile {
  getUserProfile {
    id
    name
    email
    avatar
    thumbnail
    provider
    avatarProperty {
      sex
      faceColor
      earSize
      eyeStyle
      noseStyle
      mouthStyle
      shirtStyle
      glassesStyle
      hairColor
      hairStyle
      hatStyle
      hatColor
      eyeBrowStyle
      shirtColor
      bgColor
    }
  }
}
    `;
export const GetDeskNeedReviewFlashcardDocument = `
    query GetDeskNeedReviewFlashcard($deskId: Int!) {
  getDeskNeedReviewFlashcard(deskId: $deskId) {
    total
    skip
    limit
    flashcards {
      id
      front_image
      front_text
      front_sound
      back_image
      back_text
      back_sound
      created_at
      updated_at
      SM {
        id
        name
        count
        interval
        EF
        nextDay
      }
    }
  }
}
    `;

const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
  endpoints: (build) => ({
    GetUserDesks: build.query<GetUserDesksQuery, GetUserDesksQueryVariables | void>({
      query: (variables) => ({ document: GetUserDesksDocument, variables })
    }),
    getDesks: build.query<GetDesksQuery, GetDesksQueryVariables | void>({
      query: (variables) => ({ document: GetDesksDocument, variables })
    }),
    createFlashcard: build.mutation<CreateFlashcardMutation, CreateFlashcardMutationVariables>({
      query: (variables) => ({ document: CreateFlashcardDocument, variables })
    }),
    CreateFlashcards: build.mutation<CreateFlashcardsMutation, CreateFlashcardsMutationVariables>({
      query: (variables) => ({ document: CreateFlashcardsDocument, variables })
    }),
    updateFlashcard: build.mutation<UpdateFlashcardMutation, UpdateFlashcardMutationVariables>({
      query: (variables) => ({ document: UpdateFlashcardDocument, variables })
    }),
    GetDeskFlashcards: build.query<GetDeskFlashcardsQuery, GetDeskFlashcardsQueryVariables>({
      query: (variables) => ({ document: GetDeskFlashcardsDocument, variables })
    }),
    SearchDesks: build.query<SearchDesksQuery, SearchDesksQueryVariables | void>({
      query: (variables) => ({ document: SearchDesksDocument, variables })
    }),
    UserPrivateUpdateDeskAndFlashcards: build.mutation<UserPrivateUpdateDeskAndFlashcardsMutation, UserPrivateUpdateDeskAndFlashcardsMutationVariables>({
      query: (variables) => ({ document: UserPrivateUpdateDeskAndFlashcardsDocument, variables })
    }),
    GetDesk: build.query<GetDeskQuery, GetDeskQueryVariables>({
      query: (variables) => ({ document: GetDeskDocument, variables })
    }),
    UpdateUserProfile: build.mutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>({
      query: (variables) => ({ document: UpdateUserProfileDocument, variables })
    }),
    GetUserProfile: build.query<GetUserProfileQuery, GetUserProfileQueryVariables | void>({
      query: (variables) => ({ document: GetUserProfileDocument, variables })
    }),
    GetDeskNeedReviewFlashcard: build.query<GetDeskNeedReviewFlashcardQuery, GetDeskNeedReviewFlashcardQueryVariables>({
      query: (variables) => ({ document: GetDeskNeedReviewFlashcardDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetUserDesksQuery, useLazyGetUserDesksQuery, useGetDesksQuery, useLazyGetDesksQuery, useCreateFlashcardMutation, useCreateFlashcardsMutation, useUpdateFlashcardMutation, useGetDeskFlashcardsQuery, useLazyGetDeskFlashcardsQuery, useSearchDesksQuery, useLazySearchDesksQuery, useUserPrivateUpdateDeskAndFlashcardsMutation, useGetDeskQuery, useLazyGetDeskQuery, useUpdateUserProfileMutation, useGetUserProfileQuery, useLazyGetUserProfileQuery, useGetDeskNeedReviewFlashcardQuery, useLazyGetDeskNeedReviewFlashcardQuery } = injectedRtkApi;

