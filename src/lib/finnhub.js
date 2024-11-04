import { useState, useEffect } from 'react'

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY || 'cskau8hr01qvrnd7a700cskau8hr01qvrnd7a70g';

export function useFinnhubWebSocket(symbol) {
    const [stockData, setStockData] = useState(null)
  
    useEffect(() => {
      const socket = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`)
  
      socket.addEventListener('open', () => {
        socket.send(JSON.stringify({ type: 'subscribe', symbol: symbol }))
      })
  
      socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data)
        if (data.type === 'trade') {
          const latestTrade = data.data[data.data.length - 1]
          setStockData(prevData => ({
            ...prevData,
            c: latestTrade.p,
            v: latestTrade.v,
            t: latestTrade.t,
          }))
        }
      })
  
      return () => {
        socket.close()
      }
    }, [symbol])
  
    return stockData
  }
  
  export async function fetchStockQuote(symbol) {
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`)
    if (!response.ok) {
      throw new Error('Failed to fetch stock quote')
    }
    return response.json()
  }