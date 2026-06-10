import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function run() {
  const audioPath = process.argv[2];
  if (!audioPath) {
    console.error("Please provide audio file path");
    process.exit(1);
  }

  console.log(`Sending ${audioPath} to OpenAI Whisper...`);
  try {
    const response = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: 'whisper-1',
      response_format: 'verbose_json',
    });

    const outputJson = path.join(path.dirname(audioPath), 'transcript.json');
    fs.writeFileSync(outputJson, JSON.stringify(response, null, 2));
    console.log(`Transcript saved to ${outputJson}`);

    // Print text segment by segment
    if (response.segments) {
      console.log("\n--- Transcript Segments ---");
      response.segments.forEach(seg => {
        console.log(`[${seg.start.toFixed(2)}s - ${seg.end.toFixed(2)}s]: ${seg.text}`);
      });
    }
  } catch (err) {
    console.error("Error transcribing:", err);
  }
}

run();
