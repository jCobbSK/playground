import React from 'react'
import styled from 'styled-components'
import { WordItem } from './WordItem'

const Wrapper = styled.main`
  flex-grow: 1;
  margin: 1.5rem 0;
`

export const WordList: React.FC = () => (
  <Wrapper>
    <WordItem word={{ id: '123', word: 'dudu' }} />
    <WordItem word={{ id: '123', word: 'dudu' }} />
    <WordItem word={{ id: '123', word: 'dudu' }} />
    <WordItem word={{ id: '123', word: 'dudu' }} />
  </Wrapper>
)
