import { createContext, useContext, useState } from 'react'
import { BetsContext } from './RouletteProvider'

interface iBetValues {
  values: number[];
  currency: string;
  tokenMint: string;
}

export const CurrencyContext = createContext<any>([])

const betValues: iBetValues[] = [
  {
    values: [0.10, 0.25, 0.50],
    currency: 'SOL',
    tokenMint: '11111111111111111111111111111111'
  },
  {
    values: [1, 5, 10],
    currency: 'DMC',
    tokenMint: 'DMC8y7kpeBYfkbM3MmLREKeSGnw1sdWSv68aDUfH97Bu'
  }
]

export function CurrencyProvider ({ children }: any) {
  const [currentCurrency, setCurrentCurrency] = useState<string>('SOL')
  const [currentValues, setCurrentValues] = useState(betValues[0].values)
  const [currentTokenMint, setCurrentTokenMint] = useState(betValues[0].tokenMint)

  const { setBetValue } = useContext(BetsContext)

  function updateCurrency (value: string) {
    setCurrentCurrency(value)
    updateValues(value)
  }

  function updateValues (curr: string) {
    const newCurrency = betValues.find(({ currency }) => curr === currency)
    if (!newCurrency) return
    setCurrentCurrency(curr)
    setCurrentValues(newCurrency?.values)
    setCurrentTokenMint(newCurrency.tokenMint)
    setBetValue(newCurrency.values[0])
  }

  return (
    <CurrencyContext.Provider value={{ currentCurrency, updateCurrency, currentValues, updateValues, betValues, currentTokenMint }}>
      {children}
    </CurrencyContext.Provider>
  )
}
