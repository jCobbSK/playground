import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { FixedSizeList } from 'react-window'
import { useWords } from '../hooks/useWords'
import { LoaderOverlay } from './LoaderOverlay'
import { WordItem } from './WordItem'

const Wrapper = styled.main`
  flex-grow: 1;
  margin: 1.5rem 0;
  height: calc(100vh - 75px - 3rem);
  overflow: hidden;
`

export const WordList: React.FC = () => {
  const { isLoading, words } = useWords()
  const [height, setHeight] = useState(200)
  const wrapperRef = useRef<HTMLElement>(null)
  const resizeListener = useCallback(() => {
    setHeight(wrapperRef.current?.clientHeight ?? 200)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', resizeListener)
    return () => window.removeEventListener('resize', resizeListener)
  }, [resizeListener])

  useEffect(() => {
    if (wrapperRef.current?.clientHeight) {
      setHeight(wrapperRef?.current?.clientHeight)
    }
  })

  if (isLoading) {
    return <LoaderOverlay />
  }

  return (
    <Wrapper ref={wrapperRef}>
      <FixedSizeList
        itemCount={words.length}
        itemSize={24}
        height={height}
        width="100%"
      >
        {({ index, style }) => {
          const word = words[index]
          return (
            <WordItem
              key={word.id}
              word={word}
              lineNr={index + 1}
              style={style}
            />
          )
        }}
      </FixedSizeList>
    </Wrapper>
  )
}
