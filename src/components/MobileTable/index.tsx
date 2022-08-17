import {
  AllArea,
  Area,
  BetArea,
  BetButton,
  Button,
  ButtonsArea,
  OptionsArea,
  Text
} from './styles'

interface iProps {
  handleClick: (type: string, option: string) => void;
  active: any[];
  handleSetActive: (pos: string) => void;
}

export default function MobileTable ({ handleClick, active, handleSetActive }: iProps) {
  const data = [
    { option: '1', backgroundColor: '#C90022' },
    { option: '2', backgroundColor: '#25222B' },
    { option: '3', backgroundColor: '#C90022' },
    { option: '4', backgroundColor: '#25222B' },
    { option: '5', backgroundColor: '#C90022' },
    { option: '6', backgroundColor: '#25222B' },
    { option: '7', backgroundColor: '#C90022' },
    { option: '8', backgroundColor: '#25222B' },
    { option: '9', backgroundColor: '#C90022' },
    { option: '10', backgroundColor: '#25222B' },
    { option: '11', backgroundColor: '#25222B' },
    { option: '12', backgroundColor: '#C90022' },
    { option: '13', backgroundColor: '#25222B' },
    { option: '14', backgroundColor: '#C90022' },
    { option: '15', backgroundColor: '#25222B' },
    { option: '16', backgroundColor: '#C90022' },
    { option: '17', backgroundColor: '#25222B' },
    { option: '18', backgroundColor: '#C90022' },
    { option: '19', backgroundColor: '#C90022' },
    { option: '20', backgroundColor: '#25222B' },
    { option: '21', backgroundColor: '#C90022' },
    { option: '22', backgroundColor: '#25222B' },
    { option: '23', backgroundColor: '#C90022' },
    { option: '24', backgroundColor: '#25222B' },
    { option: '25', backgroundColor: '#C90022' },
    { option: '26', backgroundColor: '#25222B' },
    { option: '27', backgroundColor: '#C90022' },
    { option: '28', backgroundColor: '#25222B' },
    { option: '29', backgroundColor: '#25222B' },
    { option: '30', backgroundColor: '#C90022' },
    { option: '31', backgroundColor: '#25222B' },
    { option: '32', backgroundColor: '#C90022' },
    { option: '33', backgroundColor: '#25222B' },
    { option: '34', backgroundColor: '#C90022' },
    { option: '35', backgroundColor: '#25222B' },
    { option: '36', backgroundColor: '#C90022' }
  ]
  return (
    <Area>
      <BetArea>
        <AllArea>
          <BetButton
            height={81}
            width={50}
            onMouseOver={() => handleSetActive('even')}
            onMouseOut={() => handleSetActive('none')}
            onClick={() => handleClick('EVEN', 'Even')}
          >
            <Text height={172}>EVEN</Text>
          </BetButton>
          <BetButton
            height={81}
            width={50}
            onMouseOver={() => handleSetActive('oneTo18')}
            onMouseOut={() => handleSetActive('none')}
            onClick={() => handleClick('SMALL', '1 to 18')}
          >
            <Text height={172}>1 to 18</Text>
          </BetButton>
          <BetButton
            height={172}
            width={80}
            onMouseOver={() => handleSetActive('oneTo12')}
            onMouseOut={() => handleSetActive('none')}
            onClick={() => handleClick('RANGE1', '1 to 12')}
          >
            <Text height={172}>1 to 12</Text>
          </BetButton>
        </AllArea>

        <AllArea>
          <BetButton
            height={81}
            width={50}
            onMouseOver={() => handleSetActive('black')}
            onMouseOut={() => handleSetActive('none')}
            onClick={() => handleClick('BLACK', 'Black')}
            color='#24222B'
          >
            {/* <Text height={172}>black</Text> */}
          </BetButton>
          <BetButton
            height={81}
            width={50}
            onMouseOver={() => handleSetActive('red')}
            onMouseOut={() => handleSetActive('none')}
            onClick={() => handleClick('RED', 'Red')}
            color='#C90022'
          >
            {/* <Text height={172}>red</Text> */}
          </BetButton>
          <BetButton
            height={172}
            width={80}
            onMouseOver={() => handleSetActive('thirteenTo24')}
            onMouseOut={() => handleSetActive('none')}
            onClick={() => handleClick('RANGE2', '13 to 24')}
          >
            <Text height={172}>13 to 24</Text>
          </BetButton>
        </AllArea>

        <AllArea>
          <BetButton
            height={81}
            width={50}
            onMouseOver={() => handleSetActive('from19')}
            onMouseOut={() => handleSetActive('none')}
            onClick={() => handleClick('HIGH', '19 to 36')}
          >
            <Text height={172}>19 to 36</Text>
          </BetButton>
          <BetButton
            height={81}
            width={50}
            onMouseOver={() => handleSetActive('odds')}
            onMouseOut={() => handleSetActive('none')}
            onClick={() => handleClick('ODD', 'Odd')}
          >
            <Text height={172}>ODD</Text>
          </BetButton>
          <BetButton
            height={172}
            width={80}
            onMouseOver={() => handleSetActive('from25ToMax')}
            onMouseOut={() => handleSetActive('none')}
            onClick={() => handleClick('RANGE3', '25 to 36')}
          >
            <Text height={172}>25 to 36</Text>
          </BetButton>
        </AllArea>

      </BetArea>
      <OptionsArea>
        <Button
          height={40}
          width={128}
          color='#17BF68'
        >
          0
        </Button>
        <ButtonsArea>
          {
            data.map(({ option, backgroundColor }) => (
              <Button
                key={option}
                height={40}
                width={40}
                color={backgroundColor}
                active={
                  active.includes(Number(option))
                }
                onClick={() => handleClick('STRAIGHT', option)}
              >
                {option}
              </Button>
            ))
          }
        </ButtonsArea>
        <ButtonsArea>
          <Button
            height={40}
            width={40}
            color='transparent'
            border='rgba(151, 151, 151, 1)'
            textColor='rgba(151, 151, 151, 1)'
            onMouseOver={() => handleSetActive('thirdLine')}
            onMouseOut={() => handleSetActive('none')}
            onClick={() => handleClick('LINE3', 'Third Line')}

          >
            2:1
          </Button>

          <Button
            height={40}
            width={40}
            color='transparent'
            border='rgba(151, 151, 151, 1)'
            textColor='rgba(151, 151, 151, 1)'
            onMouseOver={() => handleSetActive('secondLine')}
            onMouseOut={() => handleSetActive('none')}
            onClick={() => handleClick('LINE2', 'Second Line')}
          >
            2:1
          </Button>

          <Button
            height={40}
            width={40}
            color='transparent'
            border='rgba(151, 151, 151, 1)'
            textColor='rgba(151, 151, 151, 1)'
            onMouseOver={() => handleSetActive('firstLine')}
            onClick={() => handleClick('LINE1', 'First Line')}
            onMouseOut={() => handleSetActive('none')}
          >
            2:1
          </Button>

        </ButtonsArea>
      </OptionsArea>
    </Area>
  )
}
