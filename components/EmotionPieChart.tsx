import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { EmotionData, emotionEmojis } from '@/utils/parseData'

interface EmotionPieChartProps {
  data: EmotionData[]
}

const COLORS = [
    '#FFAEA5', // Softer pink
    '#FFC2B2', // Soft peach
    '#FFE2C2', // Neutral light orange
    '#E7F5CC', // Muted light green
    '#C7EAD8', // Gentle teal
    '#D5DFF5', // Soft blue
    '#F4B8B8', // Light coral
    '#FAD9D9', // Light blush
    '#FFEDD1', // Pale apricot
    '#D9F4F4', // Soft aqua
];

export function EmotionPieChart({ data }: EmotionPieChartProps) {
  const emotionCounts = data.reduce((acc, item) => {
    acc[item.mood] = (acc[item.mood] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const chartData = Object.entries(emotionCounts).map(([name, value]) => ({ name, value }))

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180)
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180)
    const emotion = chartData[index].name
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {emotionEmojis[emotion]}
      </text>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={CustomLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${value} (${((value as number / data.length) * 100).toFixed(2)}%)`, `${emotionEmojis[name as string]} ${name}`]} />
        <Legend formatter={(value) => `${emotionEmojis[value]} ${value}`} />
      </PieChart>
    </ResponsiveContainer>
  )
}

