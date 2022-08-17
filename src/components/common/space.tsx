import styled from "@emotion/styled";

const Component = styled.div`
  height: ${p => p.height || 0}px;
  width: ${p => p.width || 0}px;
`

const Space = ({ height = 0, width = 0 }) => {
  return (
    <Component height={height} width={width}>
      <p style={{color: 'transparent', margin: 0}}>aaaa</p>
      </Component>
  );
};

export default Space;