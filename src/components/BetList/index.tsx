import { BetsContext } from '../../contexts/RouletteProvider'
import { useContext } from 'react'
import {
  Area,
  Bet,
  DeleteArea
} from './styles'

interface iBet {
  type: string;
  option: number;
  value: number;
  currency: string;
  id: number;
}

export default function BetList () {
  const { bets, removeBet } = useContext(BetsContext)
  return (
    <Area>
      {
        bets.map(({ option, value, currency, id }: iBet) => (
          <Bet key={option + currency}>
            {option} - Amount: {value} {currency}
            <DeleteArea
              onClick={() => removeBet(id)}
            >
              X
            </DeleteArea>
          </Bet>
        ))
      }
    </Area>
  )
}
