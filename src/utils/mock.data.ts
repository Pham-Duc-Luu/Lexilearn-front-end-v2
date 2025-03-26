import { languages, ReoderVocabCardItem } from '@/redux/store/newDesk.slice';
import { faker } from '@faker-js/faker';

export function generateReorderVocabCard(): ReoderVocabCardItem {
  const randomLanguage = (): (typeof languages)[number] =>
    languages[Math.floor(Math.random() * languages.length)];

  return {
    id: faker.string.uuid(),
    word: {
      text: faker.word.noun(),
      sound: faker.internet.url(),
      lanuage: randomLanguage(),
      index: 0,
    },
    mean: {
      text: faker.word.adjective(),

      sound: faker.internet.url(),
      lanuage: randomLanguage(),
      index: 0,
    },
    examples: Array.from(
      { length: faker.number.int({ min: 1, max: 3 }) },
      () => ({
        text: faker.lorem.sentence(),
        sound: faker.internet.url(),
        lanuage: randomLanguage(),
      })
    ).map((item, index) => {
      return {
        ...item,
        index: index,
      };
    }),
  };
}

export function generateReorderVocabCards(
  count: number
): ReoderVocabCardItem[] {
  return Array.from({ length: count }, () => generateReorderVocabCard());
}
