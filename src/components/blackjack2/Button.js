import styled from 'styled-components';
//import {Link} from 'react-router-dom'
import {colors} from './assets/colors'

export const Button = styled.div`
    border-radius: 20px;
    background: ${colors.buttonPrimary};
    white-space: nowrap;
    padding: 8px 16px;
    color: ${colors.buttonText};
    font-size: 16px;
    min-width: 100px;
    margin: 4px 0;
    margin: ${({smallMargin}) => (smallMargin ? '0px 5px 0px 5px ' : '4px 0')};
    border: solid 5px;
    border-color: ${colors.buttonBorder};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        scale: 1.1;
        background: ${colors.buttonHover};
    }
`

export const DivButton = styled.div`
    border-radius: 20px;
    background: ${colors.buttonPrimary};
    white-space: nowrap;
    padding: 8px 16px;
    color: ${colors.buttonText};
    font-size: 16px;
    min-width: 100px;
    margin: 4px 0;
    margin: ${({smallMargin}) => (smallMargin ? '0px 5px 0px 5px ' : '4px 0')};
    border: solid 5px;
    border-color: ${colors.buttonBorder};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        scale: 1.1;
        background:${({isEnabled}) => (isEnabled ?  colors.buttonHover : colors.disabled)};
    }
`