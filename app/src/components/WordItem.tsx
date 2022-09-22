import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  color: ${(props) => props.theme.text};
  font-size: 1.5rem;
  padding: 0.25rem 0;

  &:hover {
    box-shadow: 0px 0px 0px 1px ${(props) => props.theme.textMuted};
    cursor: pointer;
  }

  &:hover .line-number {
    color: white;
  }
`

const LineNumber = styled.span`
  color: ${(props) => props.theme.textMuted};
  margin: 0 1.5rem;
  width: 5rem;
  text-align: right;
`

const Flex = styled.div`
  display: flex;
`

interface Props {
  word: Word
}

export const WordItem: React.FC<Props> = ({ word }) => (
  <Container>
    <Flex>
      <LineNumber className="line-number">{word.id}</LineNumber>
      <span>{word.word}</span>
    </Flex>
  </Container>
)
