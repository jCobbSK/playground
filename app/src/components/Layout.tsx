import React from 'react'
import styled from 'styled-components'
import { Logo } from './Logo'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.darkest};
`

const Header = styled.header`
  background-color: ${(props) => props.theme.darker};
  height: 75px;
  position: sticky;
`

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FullHeightContainer = styled(Container)`
  height: 100%;
`

interface Props {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => (
  <Wrapper>
    <Header>
      <FullHeightContainer>
        <Logo />
        <div>+</div>
      </FullHeightContainer>
    </Header>
    <Container>{children}</Container>
  </Wrapper>
)
