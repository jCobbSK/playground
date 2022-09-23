import React from 'react'
import styled from 'styled-components'
import { useWords } from '../hooks/useWords'
import { LoaderOverlay } from './LoaderOverlay'
import { WordItem } from './WordItem'

const Wrapper = styled.main`
  flex-grow: 1;
  margin: 1.5rem 0;
`

export const WordList: React.FC = () => {
  const { isLoading, words } = useWords()

  if (isLoading) {
    return <LoaderOverlay />
  }

  return (
    <Wrapper>
      {words.map((w, i) => (
        <WordItem key={w.id} word={w} lineNr={i + 1} />
      ))}
    </Wrapper>
  )
}
