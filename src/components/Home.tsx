import styled from "styled-components";
import { AppLogo } from "./Logo";

const HomeScreenStyle = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(black, gray);
`;

export function HomeScreen () {
  return  <HomeScreenStyle><AppLogo /></HomeScreenStyle>
}