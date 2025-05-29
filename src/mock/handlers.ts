import { faker } from '@faker-js/faker';
import { graphql, HttpResponse } from 'msw';

export const handlers = [
  graphql.query('GetDesk', ({ query, variables }) => {
    const flashcards = Array.from(
      { length: faker.number.int({ min: 20, max: 60 }) },
      () => {
        return {
          id: 'flashcard-1',
          front_image: faker.image.url(),
          front_text: faker.word.sample(),
          front_sound:
            'https://data.mazii.net/audios/ja-JP/9c98ce827af2786471aa84a467aeec0b.mp3',
          back_image: faker.image.url(),
          back_text: faker.word.sample(),
          back_sound:
            'https://data.mazii.net/audios/ja-JP/9c98ce827af2786471aa84a467aeec0b.mp3',
          created_at: faker.date.anytime(),
          updated_at: '2024-01-01T00:00:00Z',
        };
      }
    );

    return HttpResponse.json({
      data: {
        getDesk: {
          id: 10,
          name: 'Mock Desk Name',
          description: 'This is a mocked desk description.',
          icon: '📘',
          isPublic: true,
          ownerId: 'user-123',
          thumbnail: faker.image.url(),
          status: 'ACTIVE',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-02T00:00:00Z',
          owner: {
            __typename: 'User',
            id: 'user-123',
            name: 'Mock User',
            email: 'mock@example.com',
            avatar: faker.image.avatar(),
            thumbnail: 'https://example.com/avatar-thumb.png',
          },
          flashcardQuantity: flashcards,
          flashcards,
        },
      },
    });
  }),
];
