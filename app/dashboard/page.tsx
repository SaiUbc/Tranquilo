'use client'

import { useState } from 'react'
import { parseCSVData, EmotionData, emotionEmojis } from '@/utils/parseData'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EmotionPieChart } from '@/components/EmotionPieChart'
// import { EmotionLineChart } from '@/components/EmotionLineChart'

const csvData = `id,date,mood,intensity,summary
1,2025-01-01,happy,8,Started the new year with a positive mindset! 🎊
2,2025-01-02,excited,9,Got accepted into my dream university! 🎓
3,2025-01-03,calm,6,Enjoyed a peaceful meditation session. 🧘‍♀️
4,2025-01-04,sad,4,Missing my old friends from high school. 💌
5,2025-01-05,angry,7,Traffic made me late for an important meeting. 🚗
6,2025-01-06,anxious,8,Preparing for a big presentation tomorrow. 📊
7,2025-01-07,loved,9,Surprise visit from my long-distance partner! ❤️
8,2025-01-08,surprised,7,Found out I won a local art competition! 🎨
9,2025-01-09,silly,8,Had a fun game night with friends, couldn't stop laughing! 🃏
10,2025-01-10,sleepy,5,Stayed up too late binge-watching a new series. 📺
11,2025-01-11,happy,7,Cooked a delicious meal for my family. 🍳
12,2025-01-12,excited,8,Booked tickets for a summer music festival! 🎵
13,2025-01-13,calm,7,Spent the afternoon reading in the park. 📚
14,2025-01-14,sad,6,Rainy day, feeling a bit gloomy. ☔
15,2025-01-15,angry,5,Got into an argument with a coworker. 😤
16,2025-01-16,anxious,7,Waiting for important test results. 🏥
17,2025-01-17,loved,8,Received a heartwarming letter from grandma. 💖
18,2025-01-18,surprised,9,Friends threw me a surprise birthday party! 🎂
19,2025-01-19,silly,7,Tried a new dance class and felt ridiculous but had fun! 💃
20,2025-01-20,sleepy,6,Monday morning struggle is real. ☕`

export default function EmotionDashboard() {
  const data: EmotionData[] = parseCSVData(csvData);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const emotions = Array.from(new Set(data.map((item) => item.mood)));

  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // Filtered data based on selected mood
  const filteredData = data.filter((item) =>
    !selectedMood || item.mood === selectedMood
  );

  const totalDays = data.length;

  const mostCommonMood = Object.entries(
    data.reduce((acc, item) => {
      acc[item.mood] = (acc[item.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).reduce((max, curr) => (curr[1] > max[1] ? curr : max), ['', 0])[0];

  return (
    <div className="container flex flex-col items-center justify-center mx-auto p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#27272A] dark:to-[#09090B] min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
        Emotion Dashboard
      </h1>
  
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="grid grid-rows-1 md:grid-rows-2 lg:grid-rows-2 gap-4">
          {/* Total Days */}
          <Card className="bg-white bg-opacity-90 shadow-md backdrop-blur-lg dark:bg-[#27272A] dark:bg-opacity-90">
            <CardHeader>
              <CardTitle className="text-green-600 dark:text-green-400">
                Total Days
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200">
                {totalDays} 🔥
              </p>
            </CardContent>
          </Card>
  
          {/* Most Common Mood */}
          <Card className="bg-white bg-opacity-90 shadow-md backdrop-blur-lg dark:bg-[#27272A] dark:bg-opacity-90">
            <CardHeader>
              <CardTitle className="text-pink-500 dark:text-pink-400">
                Most Common Mood
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <span className="text-4xl">{emotionEmojis[mostCommonMood]}</span>
                <p className="text-lg font-semibold mt-2 text-gray-800 dark:text-gray-200">
                  {mostCommonMood}
                </p>
              </div>
            </CardContent>
          </Card>
  
          {/* Pie Chart */}
          <Card className="bg-white bg-opacity-90 shadow-md backdrop-blur-lg dark:bg-[#27272A] dark:bg-opacity-90">
            <CardHeader>
              <CardTitle className="text-purple-500 dark:text-purple-400">
                Emotions Pie 🥧
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                A slice of your feelings!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmotionPieChart data={filteredData} />
            </CardContent>
          </Card>
        </div>
  
        {/* Scrollable Table */}
        <Card className="bg-white bg-opacity-90 shadow-md backdrop-blur-lg dark:bg-[#27272A] dark:bg-opacity-90 mx-auto">
          <CardHeader>
            <CardTitle className="text-blue-500 dark:text-blue-400">
              Daily Emotion Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-y-auto max-h-[700px] rounded-t-md">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 dark:bg-[#27272A] dark:text-gray-400 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Mood</th>
                    <th className="py-3 px-6 text-left">Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 hover:bg-gray-100 dark:border-[#09090B] dark:hover:bg-[#1C1C1E]"
                    >
                      <td className="py-3 px-6 text-left text-gray-800 dark:text-gray-200">
                        {item.date}
                      </td>
                      <td className="py-3 px-6 text-left text-gray-800 dark:text-gray-200">
                        {emotionEmojis[item.mood]} {item.mood}
                      </td>
                      <td className="py-3 px-6 text-left text-gray-800 dark:text-gray-200">
                        {item.summary}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
}
