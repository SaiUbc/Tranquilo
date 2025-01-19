import { parse } from 'csv-parse/sync';

export interface EmotionData {
  id: number;
  date: string;
  mood: string;
  intensity: number;
  summary: string;
}

export const emotionEmojis: Record<string, string> = {
  happy: "😊",
  excited: "🎉",
  calm: "😌",
  sad: "😢",
  angry: "😠",
  anxious: "😰",
  loved: "🥰",
  surprised: "😲",
  silly: "🤪",
  sleepy: "😴",
};

export function parseCSVData(csvData: string): EmotionData[] {
  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true, // Allow varying column counts
    quote: '"', // Handles quoted fields
  });

  // Filter out invalid records
  return records
    .filter((record: any) => Object.keys(record).length === 5) // Ensure all columns exist
    .map(({ id, date, mood, intensity, summary }: any) => ({
      id: parseInt(id, 10),
      date,
      mood,
      intensity: parseInt(intensity, 10),
      summary,
    }));
}
