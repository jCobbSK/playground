import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useWords } from '../hooks/useWords'
import { Button } from './Button'

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`
const rollIn = keyframes`
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
`

const Input = styled.input`
  background-color: ${(props) => props.theme.dark};
  box-shadow: none;
  border: none;
  outline: none;
  color: ${(props) => props.theme.text};
  caret-color: ${(props) => props.theme.primary};
  font-size: 16px;

  &:focus {
    margin: 2px 0 2px 2px;
    outline: none;
    box-shadow: 0 0 0 1px ${(props) => props.theme.primary};
  }
`

const RolledInInput = styled(Input)`
  animation: ${rollIn} 0.5s ease-in-out;
`

const RolledOutInput = styled(Input)`
  animation: ${rollIn} 0.5s ease-in-out reverse;
`

export const CreateWordButton: React.FC = () => {
  const { addWord } = useWords()
  const [word, setWord] = useState('')
  const [isInputVisible, setInputVisible] = useState(false)
  const [isCancelling, setCancelling] = useState(false)

  const handleCancel = () => {
    setWord('')
    setCancelling(true)
    setTimeout(() => {
      setCancelling(false)
      setInputVisible(false)
    }, 500)
  }
  const handleAddClick = () => {
    if (!isInputVisible) {
      setInputVisible(true)
      return
    }
    if (word !== '') {
      addWord(word)
    }
    handleCancel()
  }

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setWord(ev.target.value)
  }

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      handleAddClick()
      return
    }

    if (ev.key === 'Escape') {
      handleCancel()
    }
  }

  const AnimatedInput = isCancelling ? RolledOutInput : RolledInInput

  return (
    <Wrapper>
      {isInputVisible && (
        <AnimatedInput
          type="text"
          data-cy="add-word-input"
          autoComplete="false"
          autoFocus
          value={word}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      )}
      <Button
        size="lg"
        variant="primary"
        onClick={handleAddClick}
        data-cy="add-word-button"
      >
        +
      </Button>
    </Wrapper>
  )
}
