import { typeGenerated } from '@/api';
import {
  AvatarFullConfig,
  EarSize,
  EyeBrowStyle,
  EyeStyle,
  GenConfigFunc,
  GlassesStyle,
  HairStyleMan,
  HairStyleWoman,
  HatStyle,
  MouthStyle,
  NoseStyle,
  Sex,
  ShirtStyle,
} from './types';

/**
 * Pick random one from the list
 */
interface PickRandomOpt<T> {
  avoidList?: T[];
  usually?: T[];
}

type PickRandomFromList = <T>(
  data: T[],
  opt?: PickRandomOpt<T | undefined>
) => T;

export const pickRandomFromList: PickRandomFromList = (
  data,
  { avoidList = [], usually = [] } = {}
) => {
  // Filter out avoid options
  const avoidSet = new Set(avoidList.filter((item) => Boolean(item)));
  let myData = data.filter((item) => !avoidSet.has(item));

  // Increase selecting possibility of usually options
  const usuallyData = usually
    .filter(Boolean)
    .reduce((acc, cur) => acc.concat(new Array(15).fill(cur)), [] as any[]);
  myData = myData.concat(usuallyData);

  // Pick randon one from the list
  const amount = myData.length;
  const randomIdx = Math.floor(Math.random() * amount);
  return myData[randomIdx];
};

/**
 * Gennerate avatar configurations
 */
interface DefaultOptions {
  sex: Sex[];
  faceColor: string[];
  earSize: EarSize[];
  hairColor: string[];
  hairStyleMan: HairStyleMan[];
  hairStyleWoman: HairStyleWoman[];
  hatColor: string[];
  hatStyle: HatStyle[];
  eyeBrowWoman: EyeBrowStyle[];
  eyeStyle: EyeStyle[];
  glassesStyle: GlassesStyle[];
  noseStyle: NoseStyle[];
  mouthStyle: MouthStyle[];
  shirtStyle: ShirtStyle[];
  shirtColor: string[];
  bgColor: string[];
  gradientBgColor: string[];
}

export const defaultOptions: DefaultOptions = {
  sex: ['man', 'woman'],
  faceColor: ['#F9C9B6', '#AC6651'],
  earSize: ['small', 'big'],
  hairColor: [
    '#000',
    '#fff',
    '#77311D',
    '#FC909F',
    '#D2EFF3',
    '#506AF4',
    '#F48150',
  ],
  hairStyleMan: ['normal', 'thick', 'mohawk'],
  hairStyleWoman: ['normal', 'womanLong', 'womanShort'],
  hatColor: [
    '#000',
    '#fff',
    '#77311D',
    '#FC909F',
    '#D2EFF3',
    '#506AF4',
    '#F48150',
  ],
  hatStyle: ['beanie', 'turban', 'none'],
  eyeBrowWoman: ['up', 'upWoman'],
  eyeStyle: ['circle', 'oval', 'smile'],
  glassesStyle: ['round', 'square', 'none'],
  noseStyle: ['short', 'long', 'round'],
  mouthStyle: ['laugh', 'smile', 'peace'],
  shirtStyle: ['hoody', 'short', 'polo'],
  shirtColor: ['#9287FF', '#6BD9E9', '#FC909F', '#F4D150', '#77311D'],
  bgColor: [
    '#9287FF',
    '#6BD9E9',
    '#FC909F',
    '#F4D150',
    '#E0DDFF',
    '#D2EFF3',
    '#FFEDEF',
    '#FFEBA4',
    '#506AF4',
    '#F48150',
    '#74D153',
  ],
  gradientBgColor: [
    'linear-gradient(45deg, #178bff 0%, #ff6868 100%)',
    'linear-gradient(45deg, #176fff 0%, #68ffef 100%)',
    'linear-gradient(45deg, #ff1717 0%, #ffd368 100%)',
    'linear-gradient(90deg, #36cd1c 0%, #68deff 100%)',
    'linear-gradient(45deg, #3e1ccd 0%, #ff6871 100%)',
    'linear-gradient(45deg, #1729ff 0%, #ff56f7 100%)',
    'linear-gradient(45deg, #56b5f0 0%, #45ccb5 100%)',
  ],
};

const stringToHashCode = (str: string): number => {
  if (str.length === 0) return 0;
  let hash = 0;
  let char;
  for (let i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

type PickByHashCodeOpts = {
  avoidList?: string[];
  usually?: string[];
};
const pickByHashCode = (
  code: number,
  type: keyof DefaultOptions,
  opts?: PickByHashCodeOpts
): string => {
  const avoidList = (opts && opts.avoidList) || [];
  const usually = (opts && opts.usually) || [];

  // Filter out avoid options
  const avoidSet = new Set<string>(avoidList);
  let myDefaultOptions = defaultOptions[type].filter(
    (item) => !avoidSet.has(item)
  );

  // Increase selecting possibility of usually options
  myDefaultOptions = usually
    .filter(Boolean)
    .reduce((acc, cur) => acc.concat(new Array(15).fill(cur)), [] as string[])
    .concat(myDefaultOptions);

  const index = code % myDefaultOptions.length;
  return myDefaultOptions[index];
};

export const genConfig: GenConfigFunc = (userConfig = {}) => {
  const isSeedConfig = typeof userConfig === 'string';
  const hashCode = (isSeedConfig && stringToHashCode(userConfig)) || 0;
  const response = {} as Required<AvatarFullConfig>;
  response.sex = isSeedConfig
    ? (pickByHashCode(hashCode, 'sex') as Sex)
    : userConfig.sex || pickRandomFromList(defaultOptions.sex);
  response.faceColor = isSeedConfig
    ? pickByHashCode(hashCode, 'faceColor')
    : userConfig.faceColor || pickRandomFromList(defaultOptions.faceColor);
  response.earSize = isSeedConfig
    ? (pickByHashCode(hashCode, 'earSize') as EarSize)
    : userConfig.earSize || pickRandomFromList(defaultOptions.earSize);
  response.eyeStyle = isSeedConfig
    ? (pickByHashCode(hashCode, 'eyeStyle') as EyeStyle)
    : userConfig.eyeStyle || pickRandomFromList(defaultOptions.eyeStyle);
  response.noseStyle = isSeedConfig
    ? (pickByHashCode(hashCode, 'noseStyle') as NoseStyle)
    : userConfig.noseStyle || pickRandomFromList(defaultOptions.noseStyle);
  response.mouthStyle = isSeedConfig
    ? (pickByHashCode(hashCode, 'mouthStyle') as MouthStyle)
    : userConfig.mouthStyle || pickRandomFromList(defaultOptions.mouthStyle);
  response.shirtStyle = isSeedConfig
    ? (pickByHashCode(hashCode, 'shirtStyle') as ShirtStyle)
    : userConfig.shirtStyle || pickRandomFromList(defaultOptions.shirtStyle);
  response.glassesStyle = isSeedConfig
    ? (pickByHashCode(hashCode, 'glassesStyle', {
        usually: ['none'],
      }) as GlassesStyle)
    : userConfig.glassesStyle ||
      pickRandomFromList(defaultOptions.glassesStyle, { usually: ['none'] });

  // Hair
  let hairColorAvoidList: string[] = [];
  let hairColorUsually: string[] = [];
  if (isSeedConfig || !userConfig.hairColor) {
    switch (response.sex) {
      case 'woman': {
        hairColorAvoidList =
          (response.faceColor === defaultOptions.faceColor[1] && ['#77311D']) ||
          [];
        break;
      }
      case 'man': {
        hairColorUsually = ['#000'];
      }
    }
  }
  response.hairColor = isSeedConfig
    ? pickByHashCode(hashCode, 'hairColor', {
        avoidList: hairColorAvoidList,
        usually: hairColorUsually,
      })
    : userConfig.hairColor ||
      pickRandomFromList(defaultOptions.hairColor, {
        avoidList: hairColorAvoidList,
        usually: hairColorUsually,
      });

  if (isSeedConfig || !userConfig.hairStyle) {
    switch (response.sex) {
      case 'man': {
        response.hairStyle = isSeedConfig
          ? (pickByHashCode(hashCode, 'hairStyleMan', {
              usually: ['normal', 'thick'],
            }) as HairStyleMan)
          : pickRandomFromList(defaultOptions.hairStyleMan, {
              usually: ['normal', 'thick'],
            });
        break;
      }
      case 'woman': {
        response.hairStyle = isSeedConfig
          ? (pickByHashCode(hashCode, 'hairStyleWoman') as HairStyleWoman)
          : pickRandomFromList(defaultOptions.hairStyleWoman);
        break;
      }
    }
  } else {
    response.hairStyle = userConfig.hairStyle;
  }

  // Hat
  response.hatStyle = isSeedConfig
    ? (pickByHashCode(hashCode, 'hatStyle', { usually: ['none'] }) as HatStyle)
    : userConfig.hatStyle ||
      pickRandomFromList(defaultOptions.hatStyle, { usually: ['none'] });
  response.hatColor = isSeedConfig
    ? pickByHashCode(hashCode, 'hatColor')
    : userConfig.hatColor || pickRandomFromList(defaultOptions.hatColor);
  const _hairOrHatColor =
    (response.hatStyle === 'none' && response.hairColor) || response.hatColor;

  // Eyebrow
  if (!isSeedConfig && userConfig.eyeBrowStyle) {
    response.eyeBrowStyle = userConfig.eyeBrowStyle;
  } else {
    response.eyeBrowStyle =
      response.sex === 'woman'
        ? isSeedConfig
          ? (pickByHashCode(hashCode, 'eyeBrowWoman') as EyeBrowStyle)
          : pickRandomFromList(defaultOptions.eyeBrowWoman)
        : 'up';
  }

  // Shirt color
  response.shirtColor = isSeedConfig
    ? pickByHashCode(hashCode, 'shirtColor', { avoidList: [_hairOrHatColor] })
    : userConfig.shirtColor ||
      pickRandomFromList(defaultOptions.shirtColor, {
        avoidList: [_hairOrHatColor],
      });

  // Background color
  if (!isSeedConfig && userConfig.isGradient) {
    response.bgColor =
      userConfig.bgColor || pickRandomFromList(defaultOptions.gradientBgColor);
  } else {
    response.bgColor = isSeedConfig
      ? pickByHashCode(hashCode, 'bgColor', {
          avoidList: [_hairOrHatColor, response.shirtColor],
        })
      : userConfig.bgColor ||
        pickRandomFromList(defaultOptions.bgColor, {
          avoidList: [_hairOrHatColor, response.shirtColor],
        });
  }

  return response;
};

export const getConfigFromAvatarInput = (
  input: typeGenerated.AvatarProperty
) => {
  const config = genConfig({
    faceColor: input.faceColor || '#F9C9B6', // Default value
    hairColor: input.hairColor || '#000',
    hatColor: input.hatColor || '#FFD700',
    shirtColor: input.shirtColor || '#6A5ACD',
    bgColor: input.bgColor || '#E6E6FA',
    hairColorRandom: false,
    isGradient: false,
  });

  if (input.earSize) {
    config.earSize =
      input.earSize === typeGenerated.EarSize.Big ? 'big' : 'small';
  }
  if (input.eyeBrowStyle) {
    config.eyeBrowStyle =
      input.eyeBrowStyle === typeGenerated.EyeBrowStyle.Up ? 'up' : 'upWoman';
  }
  if (input.eyeStyle) {
    config.eyeStyle =
      input.eyeStyle === typeGenerated.EyeStyle.Circle
        ? 'circle'
        : input.eyeStyle === typeGenerated.EyeStyle.Oval
        ? 'oval'
        : 'smile';
  }
  if (input.glassesStyle) {
    config.glassesStyle =
      input.glassesStyle === typeGenerated.GlassesStyle.None
        ? 'none'
        : input.glassesStyle === typeGenerated.GlassesStyle.Round
        ? 'round'
        : 'square';
  }
  if (input.hairStyle) {
    config.hairStyle =
      input.hairStyle === typeGenerated.HairStyle.Mohawk
        ? 'mohawk'
        : input.hairStyle === typeGenerated.HairStyle.Normal
        ? 'normal'
        : input.hairStyle === typeGenerated.HairStyle.Thick
        ? 'thick'
        : input.hairStyle === typeGenerated.HairStyle.WomanLong
        ? 'womanLong'
        : 'womanShort';
  }
  if (input.hatStyle) {
    config.hatStyle =
      input.hatStyle === typeGenerated.HatStyle.Beanie
        ? 'beanie'
        : input.hatStyle === typeGenerated.HatStyle.Turban
        ? 'turban'
        : 'none';
  }
  if (input.mouthStyle) {
    config.mouthStyle =
      input.mouthStyle === typeGenerated.MouthStyle.Laugh
        ? 'laugh'
        : input.mouthStyle === typeGenerated.MouthStyle.Peace
        ? 'peace'
        : 'smile';
  }
  if (input.noseStyle) {
    config.noseStyle =
      input.noseStyle === typeGenerated.NoseStyle.Long
        ? 'long'
        : input.noseStyle === typeGenerated.NoseStyle.Round
        ? 'round'
        : 'short';
  }
  if (input.sex) {
    config.sex = input.sex === typeGenerated.Sex.Man ? 'man' : 'woman';
  }
  if (input.shirtStyle) {
    config.shirtStyle =
      input.shirtStyle === typeGenerated.ShirtStyle.Hoody
        ? 'hoody'
        : input.shirtStyle === typeGenerated.ShirtStyle.Polo
        ? 'polo'
        : 'short';
  }

  return genConfig(config);
};

export const getAvatarInputFromConfig = (
  config: ReturnType<typeof genConfig>
): typeGenerated.AvatarProperty => {
  return {
    faceColor: config.faceColor || null,
    hairColor: config.hairColor || null,
    hatColor: config.hatColor || null,
    shirtColor: config.shirtColor || null,
    bgColor: config.bgColor || null,

    earSize:
      config.earSize === 'big'
        ? typeGenerated.EarSize.Big
        : typeGenerated.EarSize.Small,
    eyeBrowStyle:
      config.eyeBrowStyle === 'up'
        ? typeGenerated.EyeBrowStyle.Up
        : typeGenerated.EyeBrowStyle.UpWoman,
    eyeStyle:
      config.eyeStyle === 'circle'
        ? typeGenerated.EyeStyle.Circle
        : config.eyeStyle === 'oval'
        ? typeGenerated.EyeStyle.Oval
        : typeGenerated.EyeStyle.Smile,
    glassesStyle:
      config.glassesStyle === 'none'
        ? typeGenerated.GlassesStyle.None
        : config.glassesStyle === 'round'
        ? typeGenerated.GlassesStyle.Round
        : typeGenerated.GlassesStyle.Square,
    hairStyle:
      config.hairStyle === 'mohawk'
        ? typeGenerated.HairStyle.Mohawk
        : config.hairStyle === 'normal'
        ? typeGenerated.HairStyle.Normal
        : config.hairStyle === 'thick'
        ? typeGenerated.HairStyle.Thick
        : config.hairStyle === 'womanLong'
        ? typeGenerated.HairStyle.WomanLong
        : typeGenerated.HairStyle.WomanShort,
    hatStyle:
      config.hatStyle === 'beanie'
        ? typeGenerated.HatStyle.Beanie
        : config.hatStyle === 'turban'
        ? typeGenerated.HatStyle.Turban
        : typeGenerated.HatStyle.None,
    mouthStyle:
      config.mouthStyle === 'laugh'
        ? typeGenerated.MouthStyle.Laugh
        : config.mouthStyle === 'peace'
        ? typeGenerated.MouthStyle.Peace
        : typeGenerated.MouthStyle.Smile,
    noseStyle:
      config.noseStyle === 'long'
        ? typeGenerated.NoseStyle.Long
        : config.noseStyle === 'round'
        ? typeGenerated.NoseStyle.Round
        : typeGenerated.NoseStyle.Short,
    sex: config.sex === 'man' ? typeGenerated.Sex.Man : typeGenerated.Sex.Woman,
    shirtStyle:
      config.shirtStyle === 'hoody'
        ? typeGenerated.ShirtStyle.Hoody
        : config.shirtStyle === 'polo'
        ? typeGenerated.ShirtStyle.Polo
        : typeGenerated.ShirtStyle.Short,
  };
};

// export const getAvatarInputFromConfig = (
//   config: ReturnType<typeof genConfig>
// ): typeGenerated.AvatarProperty => {
//   const getEnumValue = (value: string, enumType: any, defaultValue: any) => {
//     return enumType[value] || defaultValue;
//   };

//   return {
//     faceColor: config.faceColor || null,
//     hairColor: config.hairColor || null,
//     hatColor: config.hatColor || null,
//     shirtColor: config.shirtColor || null,
//     bgColor: config.bgColor || null,

//     earSize: getEnumValue(
//       config.earSize,
//       typeGenerated.EarSize,
//       typeGenerated.EarSize.Small
//     ),
//     eyeBrowStyle: getEnumValue(
//       config.eyeBrowStyle,
//       typeGenerated.EyeBrowStyle,
//       typeGenerated.EyeBrowStyle.UpWoman
//     ),
//     eyeStyle: getEnumValue(
//       config.eyeStyle,
//       typeGenerated.EyeStyle,
//       typeGenerated.EyeStyle.Smile
//     ),
//     glassesStyle: getEnumValue(
//       config.glassesStyle,
//       typeGenerated.GlassesStyle,
//       typeGenerated.GlassesStyle.Square
//     ),
//     hairStyle: getEnumValue(
//       config.hairStyle,
//       typeGenerated.HairStyle,
//       typeGenerated.HairStyle.WomanShort
//     ),
//     hatStyle: getEnumValue(
//       config.hatStyle,
//       typeGenerated.HatStyle,
//       typeGenerated.HatStyle.None
//     ),
//     mouthStyle: getEnumValue(
//       config.mouthStyle,
//       typeGenerated.MouthStyle,
//       typeGenerated.MouthStyle.Smile
//     ),
//     noseStyle: getEnumValue(
//       config.noseStyle,
//       typeGenerated.NoseStyle,
//       typeGenerated.NoseStyle.Short
//     ),
//     sex: getEnumValue(config.sex, typeGenerated.Sex, typeGenerated.Sex.Woman),
//     shirtStyle: getEnumValue(
//       config.shirtStyle,
//       typeGenerated.ShirtStyle,
//       typeGenerated.ShirtStyle.Short
//     ),
//   };
// };
