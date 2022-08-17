import { createContext, useState } from 'react'

export const BetsContext = createContext<any>([])

interface iBet {
  type: string;
  option: number;
  value: number;
  currency: string;
  id: number;
  tokenMint: string;
}

export function BetsProvider({ children }: any) {
  const [bets, setBets] = useState<iBet[]>([])
  const [currentValue, setCurrentValue] = useState<number>(0.1)

  function updateBets(bet: iBet) {
    let finder = false
    const count = bets.reduce((acc, { type, option, value, currency }) => type === bet.type && option === bet.option && currency === bet.currency ? acc + value : acc, 0)
    if (bet.currency == 'SOL' && count + bet.value > 0.5) {
      return
    }

    if (bet.currency == 'DMC' && count + bet.value > 20) {
      return
    }
    
    const temp = bets.map(({ type, option, value, currency, id, tokenMint }) => {
      if (type === bet.type && option === bet.option && currency === bet.currency) {
        finder = true
        return {
          type,
          option,
          value: Math.round((value + bet.value) * 100) / 100,
          currency,
          id,
          tokenMint
        }
      }
      return { type, option, value, currency, id, tokenMint }
    })
    if (!finder && bets.length >= 3) {
      return
    }
    if (!finder) {
      temp.push(bet)
    }
    setBets(temp)
  }

  function removeBet(removeId: number) {
    const temp = bets.filter(({ id }) => id !== removeId)
    setBets(temp)
  }

  function setBetValue(value: number) {
    setCurrentValue(value)
  }

  function clearBets() {
    setBets([])
  }

  return (
    <BetsContext.Provider value={{ bets, updateBets, clearBets, removeBet, setBetValue, currentValue }}>
      {children}
    </BetsContext.Provider>
  )
}
