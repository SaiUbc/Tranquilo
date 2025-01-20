import { ElevenLabsClient } from "elevenlabs";
import { spawn } from "child_process";
import Speaker from "speaker";
import ffmpegPath from "ffmpeg-static";
import { LocalStorage } from 'node-localstorage';

const client = new ElevenLabsClient({
    apiKey: "sk_4fdb72461b0f9b13696ac56bada131b6ae73a373a7bb84f3", // Replace with your ElevenLabs API key
});

const localStorage = new LocalStorage('./storage');
const response = localStorage.getItem('llmResponse') || 'No response available';
console.log(response);

const streamAudio = async (input) => {
    try {
        // Request streaming audio
        const audioStream = await client.generate({
            stream: true, // Enable streaming
            voice: "Sarah", // Replace with the desired voice
            text: ```Thank you for reaching out and sharing your feelings with me. I'm so sorry to hear that you're feeling sad and don't have anyone to talk to.

Firstly, please know that it takes immense courage to acknowledge your emotions and seek help. You've taken the first step towards healing, and I'm proud of you for that.

If you haven't already, I want to encourage you to reach out to your doctor or a healthcare professional about how you're feeling. They can offer support, guidance, and potentially prescribe medication to help manage your symptoms.

Additionally, there are many resources available to you:

1. You can call the National Alliance on Mental Illness (NAMI) Helpline at 1-800-950-6264 for emotional support and guidance.
2. The Crisis Text Line is also available 24/7 by texting "HOME" to 741741. This service provides free, confidential support from trained crisis counselors.
3. You can visit online resources like Psych Central (https://psychcentral.com/lib/common-hotline-phone-numbers/) for a list of hotlines and helplines in your area.

Remember, you're not alone in this journey. There are people who care about you and want to help. Don't hesitate to reach out to them.

Lastly, I want to acknowledge that it can be challenging to find a therapist or counselor who understands your specific needs. That's why I've included the website [https://therapists.psychologytoday.com](https://therapists.psychologytoday.com) in my response. You can search for therapists in your area and filter results based on their specialties and experience.

Keep in mind that healing is a process, and it may take time to find the right resources and support. Be patient with yourself, and don't give up. You got this.
            ```,
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

streamAudio(response);

