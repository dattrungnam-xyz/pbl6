import axios from 'axios';

export async function fetchAudio(text: string, voiceId: string) {
  const options = {
    method: 'POST',
    url: 'https://api.sws.speechify.com/v1/audio/speech',
    headers: {
      accept: '*/*',
      'content-type': 'application/json',
      Authorization: process.env.AUDIO_TOKEN,
    },
    data: {
      audio_format: 'wav',
      input: text,
      language: 'en-US',
      model: 'simba-base',
      voice_id: voiceId,
    },
  };
  const response = await axios.request(options);
  return response.data;
}
