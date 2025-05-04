export type AmericanVoice =
  | 'af_heart'
  | 'af_alloy'
  | 'af_aoede'
  | 'af_bella'
  | 'af_jessica'
  | 'af_kore'
  | 'af_nicole'
  | 'af_nova'
  | 'af_river'
  | 'af_sarah'
  | 'af_sky'
  | 'am_adam'
  | 'am_echo'
  | 'am_eric'
  | 'am_fenrir'
  | 'am_liam'
  | 'am_michael'
  | 'am_onyx'
  | 'am_puck'
  | 'am_santa';

export type BritishVoice =
  | 'bf_alice'
  | 'bf_emma'
  | 'bf_isabella'
  | 'bf_lily'
  | 'bm_daniel'
  | 'bm_fable'
  | 'bm_george'
  | 'bm_lewis';

export type JapaneseVoice =
  | 'jf_alpha'
  | 'jf_gongitsune'
  | 'jf_nezumi'
  | 'jf_tebukuro'
  | 'jm_kumo';

export type MandarinVoice =
  | 'zf_xiaobei'
  | 'zf_xiaoni'
  | 'zf_xiaoxiao'
  | 'zf_xiaoyi'
  | 'zm_yunjian'
  | 'zm_yunxi'
  | 'zm_yunxia'
  | 'zm_yunyang';

export const AmericanVoiceArray = [
  'af_heart',
  'af_alloy',
  'af_aoede',
  'af_bella',
  'af_jessica',
  'af_kore',
  'af_nicole',
  'af_nova',
  'af_river',
  'af_sarah',
  'af_sky',
  'am_adam',
  'am_echo',
  'am_eric',
  'am_fenrir',
  'am_liam',
  'am_michael',
  'am_onyx',
  'am_puck',
  'am_santa',
] as const;

export const BritishVoiceArray = [
  'bf_alice',
  'bf_emma',
  'bf_isabella',
  'bf_lily',
  'bm_daniel',
  'bm_fable',
  'bm_george',
  'bm_lewis',
] as const;

export const JapaneseVoiceArray = [
  'jf_alpha',
  'jf_gongitsune',
  'jf_nezumi',
  'jf_tebukuro',
  'jm_kumo',
] as const;

export const MandarinVoiceArray = [
  'zf_xiaobei',
  'zf_xiaoni',
  'zf_xiaoxiao',
  'zf_xiaoyi',
  'zm_yunjian',
  'zm_yunxi',
  'zm_yunxia',
  'zm_yunyang',
] as const;

export interface VoiceOptions {
  _id: string;
  Gender: string;
  Id: string;
  LanguageCode: string;
  LanguageName: string;
  Name: string;
  SupportedEngines: ('neural' | 'standard')[];
}

export interface UserTTSSubscription {
  _id: string;
  start_date: string;
  end_date: string;
  user_uuid: string;
  user_email: string;
  subscription_plan: string;
  subscription_detail: {
    total_character: number;
    spent_character: number;
    supported_engine: ('neural' | 'standard')[];
  };
}

export interface SubscribeRequest {
  subscription_plan: 'basic';
}
