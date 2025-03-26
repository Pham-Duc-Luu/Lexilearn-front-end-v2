import wordListJson from '@/public/dictionary_alpha_arrays.json';
import Fuse from 'fuse.js';
import * as _ from 'lodash';

// Step 1: Ensure wordListJson is an array
const ensureArray = (data: any) =>
  Array.isArray(data) ? data : Object.values(data);

// Step 2: Convert to uniform array and flatten
const wordListArray = _.flattenDeep(ensureArray(wordListJson));

// Use _.merge to merge the objects
const mergedObject = _.merge({}, ...wordListArray);

export const searchEnglishWords = (query: string) => {
  const fuse = new Fuse(_.keys(mergedObject), {
    threshold: 0.4, // Controls fuzzy matching sensitivity
  });
  // Filter keys that start with the query and take the first 10
  return fuse
    .search(query)
    .map((result) => result.item)
    .slice(0, 10);
};

import japaneseData from '@/public/japanese_words.json';
// Fuse.js configuration

export interface JapaneseInterface {
  img: string;
  mean: string;
  jp: {
    wd: string;
    kj: string;
    rmj: string;
  };
  category: string;
}
export const searchJapaneseWords = (query: string) => {
  const fuse = new Fuse(japaneseData, {
    keys: [
      'mean', // English meaning
      'jp.wd', // Japanese word in Hiragana
      'jp.kj', // Kanji representation
      'jp.rmj', // Romanized form
    ],
    threshold: 0.4, // Controls fuzzy matching sensitivity
  });
  return fuse
    .search(query)
    .map((result) => result.item)
    .slice(0, 10);
};

import chineseData from '@/public/chinese_word.json';
export interface IChineseDate {
  traditional: string;
  simplified: string;
  pinyinRead: string;
  pinyinType: string;
  definition: string[];
}

export const searchChineseWords = (query: string) => {
  const chineseWords: IChineseDate[] = chineseData;
  const fuse = new Fuse(chineseWords, {
    keys: [
      'traditional', // Traditional Chinese
      'simplified', // Simplified Chinese
      'pinyinRead', // Pinyin with tone marks
    ],
    threshold: 0.3, // Adjust sensitivity for fuzzy matching
  });
  return fuse
    .search(query)
    .map((result) => result.item)
    .slice(0, 10);
};
