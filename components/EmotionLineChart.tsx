import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { EmotionData, emotionEmojis } from '@/utils/parseData'

interface EmotionLineChartProps {
  data: EmotionData[]
  selectedEmotion: string | null
}

const COLORS = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#F2A6A6', '#F9D1D1', '#FFE5B4', '#D4F0F0']

export function EmotionLineChart({ data, selectedEmotion }: EmotionLineChartProps) {
  const emotions = Array.from(new Set(data.map(item => item.mood)))
  
  const chartData = data.reduce((acc, item) => {
    const existingEntry = acc.find(entry => entry.date === item.date)
    if (existingEntry) {
      existingEntry[item.mood] = item.intensity
    } else {
      acc.push({ date: item.date, [item.mood]: item.intensity })
    }
    return acc
  }, [] as any[])

  chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded shadow">
          <p className="font-bold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {emotionEmojis[entry.name]} {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend formatter={(value) => `${emotionEmojis[value]} ${value}`} />
        {emotions.map((emotion, index) => (
          <Line
            key={emotion}
            type="monotone"
            dataKey={emotion}
            stroke={COLORS[index % COLORS.length]}
            activeDot={{ r: 8 }}
            hide={selectedEmotion && selectedEmotion !== emotion}
            dot={{ fill: COLORS[index % COLORS.length], stroke: COLORS[index % COLORS.length] }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

