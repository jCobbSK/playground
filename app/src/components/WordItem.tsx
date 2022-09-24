import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useWords } from '../hooks/useWords'
import { Button } from './Button'

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  color: ${(props) => props.theme.text};
  font-size: 1.5rem;
  margin: 0.25rem 0;

  &:hover {
    box-shadow: 0px 0px 0px 1px ${(props) => props.theme.textMuted};
    cursor: pointer;
  }
`

const LineNumber = styled.span`
  color: ${(props) => props.theme.textMuted};
  margin: 0 1.5rem;
  width: 5rem;
  text-align: right;
  ${Container}:hover & {
    color: white;
  }
`

const Flex = styled.div`
  display: flex;
`

const DeleteButton = styled(Button)`
  display: none;
  padding: 4px 10px;
  ${Container}: hover & {
    display: flex;
  }
`

const fill = keyframes`
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
`
const DeleteAnimationOverlay = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  background-color: ${(props) => props.theme.danger};
  animation: ${fill} 0.5s ease-in-out;
`

interface Props {
  word: Word
  lineNr: number
}

export const WordItem: React.FC<Props> = ({ word, lineNr }) => {
  const { removeWord } = useWords()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      removeWord(word)
    }, 500)
  }
  return (
    <Container data-cy={`word-item-${word.id}`}>
      <Flex>
        <LineNumber>{lineNr}</LineNumber>
        <span>{word.word}</span>
      </Flex>
      <DeleteButton variant="danger" size="md" onClick={handleDelete}>
        X
      </DeleteButton>
      {isDeleting && <DeleteAnimationOverlay />}
    </Container>
  )
}
