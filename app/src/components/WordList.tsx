import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { FixedSizeList } from 'react-window'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
} from 'react-beautiful-dnd'
import { useWords } from '../hooks/useWords'
import { LoaderOverlay } from './LoaderOverlay'
import { WordItem } from './WordItem'

const Wrapper = styled.main`
  flex-grow: 1;
  margin: 1.5rem 0;
  height: calc(100vh - 75px - 3rem);
  overflow: hidden;
`

const DraggableWordItem: React.FC<{
  provided: DraggableProvided
  word: Word
  style?: React.CSSProperties
  index: number
  isDragging?: boolean
}> = ({ provided, word, style, isDragging = false, index }) => {
  const marginBottom = 8
  let combinedStyle = {
    ...style,
    ...provided.draggableProps.style,
  }
  const height =
    typeof combinedStyle.height === 'string'
      ? parseInt(combinedStyle.height, 10)
      : combinedStyle.height ?? 0
  combinedStyle = {
    ...combinedStyle,
    height: isDragging ? height : height - marginBottom,
    marginBottom,
  }

  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      style={combinedStyle}
    >
      <WordItem word={word} lineNr={index + 1} />
    </div>
  )
}

export const WordList: React.FC = () => {
  const { isLoading, words, moveWord } = useWords()
  const [height, setHeight] = useState(200)
  const wrapperRef = useRef<HTMLElement>(null)
  const resizeListener = useCallback(() => {
    setHeight(wrapperRef.current?.clientHeight ?? 200)
  }, [])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }
    if (result.source.index === result.destination.index) {
      return
    }

    moveWord(result.source.index, result.destination.index)
  }

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
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper ref={wrapperRef}>
        <Droppable
          droppableId="droppable"
          mode="virtual"
          renderClone={(provided, snapshot, rubric) => (
            <DraggableWordItem
              word={words[rubric.source.index]}
              index={rubric.source.index}
              isDragging={snapshot.isDragging}
              provided={provided}
            />
          )}
        >
          {(provided) => (
            <FixedSizeList
              itemCount={words.length}
              itemSize={24}
              height={height}
              outerRef={provided.innerRef}
              width="100%"
              itemData={words}
            >
              {({ index, style }) => {
                const word = words[index]
                return (
                  <Draggable draggableId={word.id} index={index} key={word.id}>
                    {(itemDraggableProvided) => (
                      <DraggableWordItem
                        provided={itemDraggableProvided}
                        style={style}
                        word={word}
                        index={index}
                      />
                    )}
                  </Draggable>
                )
              }}
            </FixedSizeList>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  )
}
