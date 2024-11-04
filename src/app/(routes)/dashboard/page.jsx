'use client'
import React, { useState, useEffect } from 'react'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, AreaChart, Area,
  ResponsiveContainer
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, TrendingUp, TrendingDown, RefreshCcw } from "lucide-react"
import { useFinnhubWebSocket, fetchStockQuote, StockData } from '@/lib/finnhub'
import Image from 'next/image'

function generateAIPrediction(currentPrice) {
  const randomFactor = Math.random() * 0.02 - 0.01
  const prediction = currentPrice * (1 + randomFactor)
  const confidence = Math.random() * 20 + 80
  return { prediction, confidence }
}

// Client-side only time formatter(Prevent Hydration Error)
const TimeDisplay = ({ date }) => {
  const [formattedTime, setFormattedTime] = useState('')

  useEffect(() => {
    if (date) {
      setFormattedTime(date.toLocaleTimeString())
    }
  }, [date])

  return <span>{formattedTime}</span>
}

export default function StockDashboard({ symbol = 'AAPL' }) {
  const [chartData, setChartData] = useState([])
  const [lastUpdate, setLastUpdate] = useState(null) 
  const [currentPrice, setCurrentPrice] = useState(null)
  const [priceChange, setPriceChange] = useState(0)
  const [companyProfile, setCompanyProfile] = useState(null)
  const [wsConnected, setWsConnected] = useState(false)
  const [aiPrediction, setAiPrediction] = useState(null)
  const [isClient, setIsClient] = useState(false) 
  
  const realtimeData = useFinnhubWebSocket(symbol)


  useEffect(() => {
    setIsClient(true)
  }, [])
 

  useEffect(() => {
    async function initializeData() {
      try {
        const initialData = await fetchStockQuote(symbol)
        const newPrediction = generateAIPrediction(initialData.c)
        setAiPrediction(newPrediction)
        const newDataPoint = {
          time: new Date(initialData.t * 1000),
          price: initialData.c,
          volume: initialData.v,
        }
        setChartData([newDataPoint])
        setCurrentPrice(initialData.c)
        setLastUpdate(new Date(initialData.t * 1000))
        setCompanyProfile({ name: 'Apple Inc.', finnhubIndustry: 'Technology Hardware, Storage & Peripherals', exchange: 'NASDAQ/NMS (GLOBAL MARKET)'})
      } catch (error) {
        console.error('Failed to fetch initial stock data:', error)
      }
    }

    initializeData()
  }, [symbol])

  useEffect(() => {
    if (realtimeData) {
      setWsConnected(true)
      const newPrediction = generateAIPrediction(realtimeData.c)
      setAiPrediction(newPrediction)
      const newDataPoint = {
        time: new Date(realtimeData.t * 1000),
        price: realtimeData.c,
        volume: realtimeData.v,
      }
      setChartData(prevData => {
        const updatedData = [...prevData, newDataPoint]
        return updatedData.slice(-100)
      })
      setCurrentPrice(prevPrice => {
        if (prevPrice !== null) {
          setPriceChange(realtimeData.c - prevPrice)
        }
        return realtimeData.c
      })
      setLastUpdate(new Date(realtimeData.t * 1000))
    }
  }, [realtimeData])

  // Connection status indicator
  const ConnectionStatus = () => (
    <div className={`h-2 w-2 rounded-full ${wsConnected ? 'bg-green-500' : 'bg-red-500'}`} />
  )

  // Chart time formatter
  const formatChartTime = (time) => {
    if (!time) return ''
    return new Date(time).toLocaleTimeString()
  }

//   console.log(realtimeData)

  return (
    <div className="w-full pb-20 max-w-6xl font-inter mx-auto p-4 space-y-4">

      <div className="flex items-center gap-2">
        <ConnectionStatus />
        <span className="text-sm text-gray-500">
          {wsConnected ? 'Connected' : 'Connecting...'}
        </span>
      </div>


      {companyProfile && (
        <Card >
           <div className='flex gap-2 items-center py-3 px-3'>
            <div className='h-[80px] w-[80px]'>
                <Image height={100} width={100} alt='apple-logo' src='https://i.postimg.cc/TwvVvNtS/image.png'/>
            </div>

            <div>
            <div className='font-bold text-xl'>{companyProfile.name} ({symbol})</div>
            <div className="text-sm text-gray-500">{companyProfile.exchange}</div>
            <div className="text-sm text-gray-500">{companyProfile.finnhubIndustry}</div>
            
            </div>
           </div>
        </Card>
      )}

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Price</CardTitle>
            {priceChange >= 0 ? 
              <TrendingUp className="text-green-500" /> : 
              <TrendingDown className="text-red-500" />
            }
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${currentPrice?.toFixed(2)}
              <span className={`text-sm ml-2 ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Predicted Next Move</CardTitle>
            <AlertCircle className="text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${aiPrediction?.prediction.toFixed(2)}
            </div>
            <p className="text-xs text-gray-500">
              Confidence: {aiPrediction?.confidence.toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Last Update</CardTitle>
            <RefreshCcw className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isClient && lastUpdate && (
                <TimeDisplay date={lastUpdate} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

    
    
      <Card>
        <CardHeader>
          <CardTitle>Price Movement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="time"
                  tickFormatter={formatChartTime}
                />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip 
                  labelFormatter={(label) => formatChartTime(label)}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      
      <Card>
        <CardHeader>
          <CardTitle>Trading Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="time"
                  tickFormatter={formatChartTime}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(label) => formatChartTime(label)}
                />
                <Area 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#4f46e5" 
                  fill="#4f46e580" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
   
      
    </div>
  )
}