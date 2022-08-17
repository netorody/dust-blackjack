import styled from 'styled-components';
import {colors} from './assets/colors'

export const Row = styled.div`
    display:flex;
    flex:1;
    flex-direction:row;
`

export const Col = styled.div`
    display:flex;
    flex:1;
    flex-direction:column;
`


export const GameScreenContainer = styled.div`
    display:flex;
    flex:1;
    flex-direction:column;
    align-items:center;
    justify-content:space-around;

    .board-wrapper {
        display: flex;
        flex-direction: row;
        gap: 16px;
        margin-top: 54px;
        justify-content: center;
        align-items: center;
    }

    .board-wrapper .score {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        gap: 24px;
    }
`

export const HandsContainer = styled.div`
    display:flex;
    flex:3;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 190px;

    &&::after {
        content: "";
        display: block;
        border: 2px solid #FFCF05;
        width: 290px;
        height: 290px;
        position: absolute;
        margin: auto;
        border-radius: 100%;
        z-index: -1;
    }

    .handplay {
        display: flex;
        flex-direction: row;
        position: relative;
    }

    .handplay div:nth-child(n+2):nth-child(-n+15) {
        margin-left: -80px;
        /* background: blue; */
    }

    .handplay::before {
        content: "";
        display: block; 
        border: 2px solid #FFCF05;
        width: 90px;
        position: absolute;
        height: 130px;
        border-radius: 8px;
        top:24px;
        left: 0;
        right: 0;
        margin: auto;
    }

    .handplay.player::before {
        bottom: 24px;
    }

    .place-info {
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
`

export const UserHandContainer = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
    padding-top: 24px;
    /* background: rgba(255,255,255,.3); */
    transition: all ease 1s;
`

export const CroupierHandContainer = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    padding-bottom: 24px;
    /* background: rgba(255,255,255,.3); */
    transition: all ease 1s;
`

export const ActionButtonContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: right;
    align-items: flex-end;
    position: relative;
    right: 0;
    width: 80px;
    background-color: rgba(0,0,0,.3);
    border: 1ps solid #000;
    border-radius: 8px;
    padding: 4px;
    gap: 4px;
    height: fit-content;
    backdrop-filter: blur(5px);
    button {
        margin: 0;
        width: 100%;
        border-radius: 4px;
        padding: 36px 0;
    }
    button:hover {
        background: #FFCF05;
    }

    
`

export const PointsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width:60px;
    min-height: 40px;
    margin-top: 5px;
    margin-bottom: 10px;
    /* border: solid 1px ${colors.buttonBorder}; */
    /* background-color: ${colors.buttonHover}; */
    justify-content: center;
    align-items: center;
    h3 {
        text-transform: uppercase;
    }
`

export const PointsValue = styled.div`
    color: white;
    text-align: center;
    font-weight: bold;
    color: #FFCF05;
    font-size: 1.25rem;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(3px);
    padding: 4px 16px;
    border-radius: 8px;
    border: 1px solid black;
    span {
        text-transform: uppercase;
        color: white;
        font-size: 0.75rem;
        display: block;
        
    }
    
`

export const BalanceContainer = styled.div`
    display:flex;
    flex: 1;
    flex-direction:column;
    align-items:center;
    justify-content:flex-start;
    position: absolute;
    bottom: 0;
    left: 0;
    background: green;
`

export const Balance = styled.div`
    background-color: #AD0034;
    align-items:center;
    justify-content:center;
    width: 120px;
    margin: 3px 0 3px 0;
`

export const BalanceText = styled.h4`
    color:white;
    margin: 12px 0 12px 0;
    text-align:center;
`

export const BetText = styled.h5`
    color:white;
    margin: 12px 0 12px 0;
    text-align:center;
`

export const BetCoin = styled.div`
    display: flex;
    width:50px;
    height: 50px;
    background-color: ${colors.buttonPrimary};
    border: 8px solid black;
    border-radius: 50%;
    margin: 1px;
    align-items:center;
    justify-content:center;
    cursor: pointer;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: ${({enabled}) => (enabled ? colors.disabled : colors.buttonHover)};
    }
`

export const BetConiText = styled.h3`
    color:white;
    text-align:center;
`

export const Message = styled.h2`
    color:white;
    text-transform: uppercase;
`
export const OptionsContainer = styled.div`
    display:flex;
    flex:1;
    flex-direction: column;
    align-self: stretch;
    align-items: space-between;
    justify-content:space-between;
    padding: 16px;
`

export const HistoryContainer = styled.div`
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content:center;
`

export const Placeholder = styled.div`
    width: 100px;
    height: 140px;
    background-color: rgba(0,0,0,0);
    background-size:cover;
    background-position:center;
    margin: 0 6px;
`

export const SubmitResultContainer = styled.div`
    display:flex;
    background-color: ${colors.buttonHover};
    padding: 12px;
    border: 5px solid black; 
    border-radius: 12px;
`

export const SubmitText = styled.h4`
    margin: 2px;
    color:white;
`