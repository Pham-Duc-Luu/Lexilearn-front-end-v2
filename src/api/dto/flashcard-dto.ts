export interface ReviewFlashcardParams {
  flashcard_id: string;
  grade: number;
}

export interface PutUpdateFlashcardRequest {
  data: {
    front_image?: string | null;
    front_sound?: string | null;
    back_image?: string | null;
    back_sound?: string | null;
    front_text: string;
    back_text: string;
    operation: 'CREATE' | 'UPDATE';
  };
  deskId: number;
  flashcardId: number;
}

export interface PutUpdateFlashcardResponse {
  timestamp: string;
  status: number;
  metadata: {
    id: string;
    front_image?: string | string;
    front_sound?: string | null;
    front_text: string;
    back_image?: string | null;
    back_sound?: string | null;
    back_text: string;
    deskId: null;
  };
  message: 'OK';
  path: null;
}
