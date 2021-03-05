import styled from 'styled-components'

export const Title = styled.h1`
  color: red;
  font-size: ${props => `${props.fontSize}px`};

  span{
    color: black;
  }
`;