import React from 'react'
import styled from 'styled-components'
import { Logo } from './Logo'

const Wrapper = styled.div`
  width: 100vw;
  background-color: ${(props) => props.theme.darkest};
`

const Header = styled.header`
  background-color: ${(props) => props.theme.darker};
  height: 75px;
  position: sticky;
  top: 0;
`

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FullHeightContainer = styled(Container)`
  height: 100%;
`

interface Props {
  children: React.ReactNode
  menu: React.ReactNode
}

export const Layout: React.FC<Props> = ({ menu, children }) => (
  <Wrapper>
    <Header>
      <FullHeightContainer>
        <Logo />
        {menu}
      </FullHeightContainer>
    </Header>
    <Container>{children}</Container>
  </Wrapper>
)
