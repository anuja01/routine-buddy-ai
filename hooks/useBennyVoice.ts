import { useCallback, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const VOICE_ID = process.env.EXPO_PUBLIC_ELEVENLABS_VOICE_ID ?? 'EXAVITQu4vr4xnSDxMaL'; // Bella — soft, warm (free tier pre-made)
const API_KEY = process.env.EXPO_PUBLIC_ELEVENLABS_API_KEY ?? '';
const CACHE_DIR = `${FileSystem.cacheDirectory}benny-voice/`;

function textHash(text: string): string {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = (Math.imul(31, h) + text.charCodeAt(i)) | 0;
  }
  return `${VOICE_ID}_${Math.abs(h)}`;
}

async function fetchAndCache(text: string): Promise<string> {
  const dirInfo = await FileSystem.getInfoAsync(CACHE_DIR);
  if (!dirInfo.exists) await FileSystem.makeDirectoryAsync(CACHE_DIR, { intermediates: true });

  const cachePath = `${CACHE_DIR}${textHash(text)}.mp3`;
  const cached = await FileSystem.getInfoAsync(cachePath);
  if (cached.exists) return cachePath;

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_turbo_v2_5',
      voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.3, use_speaker_boost: true },
    }),
  });

  if (!response.ok) throw new Error(`ElevenLabs ${response.status}: ${await response.text()}`);

  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  await FileSystem.writeAsStringAsync(cachePath, btoa(binary), {
    encoding: FileSystem.EncodingType.Base64,
  });

  return cachePath;
}

export function useBennyVoice() {
  const soundRef = useRef<Audio.Sound | null>(null);

  const stop = useCallback(async () => {
    if (!soundRef.current) return;
    await soundRef.current.stopAsync().catch(() => {});
    await soundRef.current.unloadAsync().catch(() => {});
    soundRef.current = null;
  }, []);

  const speak = useCallback(
    async (text: string) => {
      try {
        await stop();
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        const uri = await fetchAndCache(text);
        const { sound } = await Audio.Sound.createAsync({ uri }, { shouldCorrectPitch: true });
        soundRef.current = sound;
        await new Promise<void>((resolve) => {
          sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.didJustFinish) resolve();
          });
          sound.playAsync();
        });
      } catch (e) {
        console.warn('BennyVoice:', e);
      }
    },
    [stop],
  );

  useEffect(() => () => { stop(); }, []);

  return { speak, stop };
}
