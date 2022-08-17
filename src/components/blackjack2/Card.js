import styled from 'styled-components';

export const Card = styled.div`
    position: relative;
    display:flex;
    width: 100px;
    height: 140px;
    z-index: 12;
    background-image: ${({aversImage}) => (aversImage ? 'url(' + aversImage + ')' : 'url(' + aversImage + ')') };
    background-size:cover;
    background-position:center;
    margin: 0 6px;
    border-radius: 5px;
`

export const SmallCard = styled.div`
    position: relative;
    display:flex;
    width: 40px;
    height: 56px;
    background-image: ${({aversImage}) => (aversImage ? 'url(' + aversImage + ')' : 'url(' + aversImage + ')') };
    background-size:cover;
    background-position:center;
`