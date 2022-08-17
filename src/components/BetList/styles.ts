import styled from 'styled-components'

export const Area = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 50px;
  width: 90%;
  background-color: transparent;
  margin-top: auto;
  gap: 6px;
`

export const Bet = styled.div`
  display: flex;
  align-items: center;
  padding-left: 6px;
  height: 40px;
  width: 100%;
  background-color: transparent;
  color: #FFF;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #FFF;
`

export const DeleteArea = styled.div`
  height: 40px;
  width: 40px;
  margin-left: auto;
  background-color: #FFF;
  color: rgba(151, 151, 151, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: .2s;

  :hover {
    //filter: opacity(.8);
  }
`
