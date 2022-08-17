import { StackProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  
  justify-content: center;
  align-items: center;
  padding-bottom: 40px;
  @media only screen and (max-width: 800px) {
    width: 100vw;
    padding: 0px;
  }
`;

export const Layout = ({ children, style, ...props }: StackProps) => {
  if (!window) {
    return null;
  }

  if (window.innerWidth < 100) {
    return (
      <div style={{ minHeight: "100vh", ...style }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 50,
            height: "90vh",
          }}
        >
          Does not support mobile yet
        </div>
      </div>
    );
  }

  return (
    <div
      style={window.location.pathname === "/race" ? { ...style } : { ...style }}
    >
      <Wrapper>{children}</Wrapper>
    </div>
  );
};
