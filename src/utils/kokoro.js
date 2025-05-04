import { KokoroTTS } from 'kokoro-js';

const model_id = 'onnx-community/Kokoro-82M-v1.0-ONNX';
const tts = await KokoroTTS.from_pretrained(model_id, {
  dtype: 'q8', // Options: "fp32", "fp16", "q8", "q4", "q4f16"
  device: 'cpu', // Options: "wasm", "webgpu" (web) or "cpu" (node). If using "webgpu", we recommend using dtype="fp32".
});

const text = 'こんにちは、これは日本語のテキスト読み上げのデモです。';
const audio = await tts.generate(text, {
  // Use `tts.list_voices()` to list all available voices
  voice: 'ja_female',
});
audio.save('audio.wav');
