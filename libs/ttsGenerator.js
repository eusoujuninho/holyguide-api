import OpenAI from 'openai';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // Ajuste o caminho conforme necessário

const isSandbox = process.env.TTS_SANDBOX === 'TRUE';

async function generateTTS(text) {
  if (isSandbox) {
    // Utilize a API da Lemonfox para ambiente sandbox
    const openai = new OpenAI({
      apiKey: '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',
    });

    const audio = await openai.audio.speech.create({
      input: text,
      voice: 'echo',
      response_format: 'mp3',
      model: 'tts-1',
    });

    const buffer = Buffer.from(await audio.arrayBuffer());

    // Gerar um nome único para o arquivo
    const fileName = `audio-${Date.now()}.mp3`;
    const audioRef = ref(storage, `audios/${fileName}`);

    // Fazer o upload do buffer para o Firebase Storage
    await uploadBytes(audioRef, buffer, { contentType: 'audio/mp3' });

    // Obter a URL de download do arquivo
    const downloadUrl = await getDownloadURL(audioRef);

    return downloadUrl;
  } else {
    // Utilize a API ElevenLabs para outros ambientes
    const voiceId = process.env.ELEVENLABS_VOICE_ID || '';
    const apiKey = process.env.ELEVENLABS_API_KEY || '';
    const ttsProviderApiUrl = process.env.TTS_PROVIDER_API_URL || '';

    if (!voiceId || !apiKey || !ttsProviderApiUrl) {
      throw new Error('Missing required environment variables');
    }

    const queryParams = new URLSearchParams({
      elevenlabs_api_key: apiKey,
      elevenlabs_voice_id: voiceId,
      target_text: text,
    });

    const response = await fetch(`${ttsProviderApiUrl}?${queryParams.toString()}`);
    const data = await response.json();

    return data.audioUrl;
  }
}

export default generateTTS;
