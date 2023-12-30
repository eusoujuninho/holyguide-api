import OpenAI from 'openai';
import fs from 'fs';
import fetch from 'node-fetch';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

const openai = new OpenAI({
  apiKey: 'YOUR_API_KEY',
  baseURL: 'https://api.lemonfox.ai/v1',
});

async function downloadFile(url, outputPath) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download file: ${response.statusText}`);
  await streamPipeline(response.body, createWriteStream(outputPath));
}

async function transcribeAudio(input) {
  let audioStream;

  if (input.startsWith('http://') || input.startsWith('https://')) {
    const tempFilePath = `temp-${Date.now()}.mp3`;
    await downloadFile(input, tempFilePath);
    audioStream = fs.createReadStream(tempFilePath);
  } else {
    audioStream = fs.createReadStream(input);
  }

  try {
    const transcription = await openai.audio.transcriptions.create({
      file: audioStream,
      model: 'whisper-1',
    });

    return transcription.text;
  } catch (error) {
    console.error('Error in speech-to-text transcription:', error);
    throw error;
  } finally {
    if (audioStream.path !== input) {
      // Delete the temporary file if it was downloaded
      fs.unlinkSync(audioStream.path);
    }
  }
}

export default transcribeAudio;
