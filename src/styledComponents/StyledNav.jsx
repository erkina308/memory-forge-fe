import styled from "styled-components";

const StyledNav = styled.nav`
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 5px;
  & ul {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.25rem;
  }
  & li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  & a {
    text-decoration: none;
    color: black;
    cursor: pointer;
    font-size: 19px;
    padding: 1.25rem;
    font-weight: 600;
    &:visited {
      color: black;
    }
    &:hover {
      color: grey;
    }
  }
`;
export default StyledNav;
