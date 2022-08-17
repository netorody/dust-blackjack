import styled from 'styled-components'

export const Article = styled.article<{index: number}>`
  position: relative;
  width: 96px;
  height: 128px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  margin-left: ${({ index }) => index > 0 ? '-40px' : 0};
  border: 1px solid green;

  .rank.upside {
    position: absolute;
    left: 3px;
    top: 3px;
  }

  .rank.downside {
    position: absolute;
    right: 3px;
    bottom: 3px;
    transform: rotate(180deg);
  }

  .♥,
  .♦ {
    color: red;
  }
`
