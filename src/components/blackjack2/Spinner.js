import styled from 'styled-components';
import React from 'react';
import {colors} from './assets/colors'

const StyledSpinner = styled.svg`
    animation: rotate 2s linear infinite;
    width: 50px;
    height: 50px;
    align-items:center;
    justify-content:center;
    
    & .path {
        stroke: ${colors.buttonText};
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
    }
    
    @keyframes rotate {
        100% {
        transform: rotate(360deg);
        }
    }
    @keyframes dash {
        0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
        }
        50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
        }
        100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
        }
    }
`

function Spinner(isVisible) {
    return (
            <StyledSpinner>
                <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="8"
                />
            </StyledSpinner>
    )
}

export default Spinner