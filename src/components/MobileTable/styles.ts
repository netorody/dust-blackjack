import styled from 'styled-components'

export const Area = styled.div`
  height: fit-content;
  width: 100%;
  /* background-color: #F00; */
  display: none;
  margin-bottom: 20px;
  justify-content: center;

  @media only screen and (max-width: 1023px) {
    display: flex;
  }
`

export const BetArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #cdcdcd; */
  width: 50%;
  max-width: 160px;
  height: 100%;
  padding-top: 44px;
  padding-right: 4px;
  gap: 4px;
`

export const OptionsArea = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  background-color: #dadada;
  height: fit-content;
  gap: 4px;
`

export const Button = styled.div<{ height: number, width: number, color: string, border?: string, active?: boolean, textColor?: string }>`
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  background-color: ${({ active, color }) => active ? color === '#C90022' ? '#fc7086' : '#5f5b69' : color === '#C90022' ? '#C90022' : color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  border: ${({ border }) => border && `1px solid ${border}`};
  cursor: pointer;
  transition: .2s;
  color: ${({ textColor }) => textColor ? 'rgba(151, 151, 151, 1)' : '#FFF'};

  :hover {
    background-color: ${({ color }) => color === '#C90022' ? '#fc7086' : '#5f5b69'};
  }
`

export const BetButton = styled.button<{ height?: number, width?: number, color?: string, border?: string, active?: boolean, textColor?: string }>`
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  background-color: ${({ color }) => color || 'transparent'};
  border: ${({ color }) => color ? 'none' : '1px solid rgba(151, 151, 151, 1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  transition: .2s;
  color: ${({ textColor }) => textColor ? 'rgba(151, 151, 151, 1)' : '#FFF'};
  /* overflow-y: auto; */

  :hover {
    background-color: ${({ color }) => color === '#C90022' ? '#fc7086' : '#5f5b69'};
  }
`

export const ButtonsArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 128px;
  gap: 4px;
`

export const AllArea = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap;
  align-items: flex-end;
  /* background-color: #F0F; */
  max-height: 172px;
  gap: 10px 4px;
  width: 74%;
  max-width: 132px;
`

export const Text = styled.span<{ height: number }>`
  /* transform: rotate(90deg); */
  /* width: ${({ height }) => `${height}px`}; */
  /* background-color: #F00; */
  color: #979797;
  font-size: 16px;

`
