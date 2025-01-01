/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Text } from '@chakra-ui/react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface WeeklyOrdersProps {
  data: Array<{
    date: string
    count: number
  }>
}

export const WeeklyOrders = ({ data }: WeeklyOrdersProps) => {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: 'rgb(37, 99, 235)',
        borderRadius: 8
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="sm" h="100%">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Pedidos por semana
      </Text>
      <Box h="calc(100% - 50px)">
        <Bar
          data={chartData}
          options={{
            ...options,
            maintainAspectRatio: false
          }}
        />
      </Box>
    </Box>
  )
}
