// import { ElevenLabsClient, play } from "elevenlabs";

// const client = new ElevenLabsClient({
//     apiKey: "sk_6022161963e9219ec9750a94efde2dc38d242b5207f9fa51", // Replace with your valid API key
// });

// const textToSpeech = async () => {
//     try {
//         const voiceId = "FGY2WhTYpPnrIDTdsKH5"; // Replace with a valid voice ID from the above output

//         const audio = await client.textToSpeech.convert(voiceId, {
//             text: "Hi, this is an auto-generated voice test",
//         });

//         console.log("Audio generated successfully:", audio);
//         // Save or play the audio here
//         await play(audio);
//     } catch (error) {
//         console.error("Error generating text-to-speech:", error.message);
//         if (error.response) {
//             console.error("Response body:", await error.response.text());
//         }
//     }
// };

// textToSpeech();



// import WebSocket from 'ws';
// import fs from 'fs';

// const API_KEY = "sk_6022161963e9219ec9750a94efde2dc38d242b5207f9fa51"; // Replace with your ElevenLabs API key
// const VOICE_ID = "FGY2WhTYpPnrIDTdsKH5"; // Replace with a valid voice ID
// const URL = `wss://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream-input`;

// // WebSocket connection
// const ws = new WebSocket(URL, {
//     headers: {
//         'xi-api-key': API_KEY
//     }
// });

// // Event: Connection opened
// ws.on('open', () => {
//     console.log("WebSocket connection opened.");

//     // Step 1: Initialize the connection with a blank space
//     ws.send(JSON.stringify({
//         text: " ",
//         voice_settings: {
//             stability: 0.5,
//             similarity_boost: 0.8
//         }
//     }));

//     // Step 2: Send the text you want to convert to speech
//     ws.send(JSON.stringify({
//         text: "Akshat loves flask, someone pleaseeeee stop him!",
//         try_trigger_generation: true
//     }));

//     // Step 3: Close the stream
//     ws.send(JSON.stringify({ text: "" }));
// });

// // Event: Receiving audio data
// ws.on('message', (data) => {
//     const parsedData = JSON.parse(data);
//     if (parsedData.audio) {
//         const audioBuffer = Buffer.from(parsedData.audio, 'base64');
//         fs.appendFileSync('output.mp3', audioBuffer);
//         console.log("Audio chunk saved.");
//     } else if (parsedData.isFinal) {
//         console.log("Final audio received. Streaming complete.");
//     }
// });

// // Event: Connection closed
// ws.on('close', () => {
//     console.log("WebSocket connection closed.");
// });

// // Event: Error handling
// ws.on('error', (error) => {
//     console.error("WebSocket error:", error);
// });


// import { ElevenLabsClient } from "elevenlabs";
// import SpeakerPkg from "speaker"; // Adjust import for CommonJS module
// const { Speaker } = SpeakerPkg;
// const { Speaker } = require("speaker");


// const client = new ElevenLabsClient({
//     apiKey: "sk_4fdb72461b0f9b13696ac56bada131b6ae73a373a7bb84f3", // Replace with your ElevenLabs API key
// });

// const streamAudio = async () => {
//     try {
//         // Request streaming audio
//         const audioStream = await client.generate({
//             stream: true, // Enable streaming
//             voice: "Aria", // Replace with the desired voice
//             text: "This is a real-time streaming voice example.",
//             model_id: "eleven_multilingual_v2",
//         });

//         // Configure Speaker instance
//         const speaker = new Speaker({
//             channels: 2, // Stereo
//             bitDepth: 16,
//             sampleRate: 44100, // Default sample rate for ElevenLabs
//         });

//         // Pipe audio stream directly to the speaker
//         audioStream.pipe(speaker);

//         console.log("Streaming audio in real-time...");
//     } catch (error) {
//         console.error("Error streaming audio:", error);
//     }
// };

// streamAudio();


import { ElevenLabsClient } from "elevenlabs";
import { spawn } from "child_process";
import Speaker from "speaker";
import ffmpegPath from "ffmpeg-static";

const client = new ElevenLabsClient({
    apiKey: "sk_4fdb72461b0f9b13696ac56bada131b6ae73a373a7bb84f3", // Replace with your ElevenLabs API key
});

const streamAudio = async () => {
    try {
        // Request streaming audio
        const audioStream = await client.generate({
            stream: true, // Enable streaming
            voice: "Sarah", // Replace with the desired voice
            text: "That sounds like a lot, I can understand what you're going through. If you ever feel overwhelmed then call +1 778-266-6666.",
            model_id: "eleven_multilingual_v2",
        });

        // Spawn ffmpeg process to decode MP3 to PCM and adjust playback speed
        const ffmpeg = spawn(ffmpegPath, [
            '-i', 'pipe:0', // Input from stdin
            '-filter:a', 'atempo=0.83', // Adjust playback speed (slower: 0.8x)
            '-f', 'wav', '-' // Output format: PCM WAV
        ]);

        // Configure the Speaker instance
        const speaker = new Speaker({
            channels: 1.9, // Stereo
            bitDepth: 16,
            sampleRate: 44100, // Standard PCM audio sample rate
        });

        // Pipe the audio stream through ffmpeg and into the speaker
        audioStream.pipe(ffmpeg.stdin); // Input audio stream to ffmpeg
        ffmpeg.stdout.pipe(speaker); // Output PCM data to the speaker

        console.log("Streaming audio in real-time with slower speed...");
    } catch (error) {
        console.error("Error streaming audio:", error);
    }
};

streamAudio();

