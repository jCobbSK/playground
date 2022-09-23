import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import * as WordStorageService from '../services/WordStorageService'

interface WordsCtx {
  words: Word[]
  isLoading: boolean
  hasFailed: boolean
  addWord(newWord: string): void
  removeWord(word: Word): void
  moveWord(oldPositionIndex: number, newPositionIndex: number): void
}

interface WordsPayload {
  data: Word[]
  version: string
}

const INITIAL_CONTEXT = {
  words: [],
  isLoading: true,
  hasFailed: false,
  addWord: () => {},
  removeWord: () => {},
  moveWord: () => {},
}

export const WordsContext = React.createContext<WordsCtx>(INITIAL_CONTEXT)

export const WordsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [words, setWords] = useState<Word[]>([])
  const [version, setVersion] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [hasFailed, setFailed] = useState(false)
  const abortController = useRef<AbortController>()

  useEffect(() => {
    abortController.current = new AbortController()
    fetch(`${import.meta.env.VITE_API_URL}/api/words`, {
      signal: abortController.current.signal,
    })
      .then<WordsPayload>((response) => response.json())
      .then((data) => {
        setVersion(data.version)
        setWords(
          WordStorageService.getDisplayableWords(data.data, data.version)
        )
        setLoading(false)
      })
      .catch(() => {
        setFailed(true)
      })

    return () => {
      abortController.current?.abort()
    }
  }, [])

  const removeWord = useCallback(
    (word: Word) => {
      setWords((oldWords) =>
        WordStorageService.removeWord({ words: oldWords, version }, word)
      )
    },
    [version]
  )

  const addWord = useCallback(
    (word: string) => {
      setWords((oldWords) =>
        WordStorageService.addWord({ words: oldWords, version }, word)
      )
    },
    [version]
  )

  const moveWord = useCallback(
    (startPosition: number, newPosition: number) => {
      setWords((oldWords) =>
        WordStorageService.moveWord(
          { words: oldWords, version },
          startPosition,
          newPosition
        )
      )
    },
    [version]
  )

  const contextValue = useMemo(
    () => ({
      ...INITIAL_CONTEXT,
      words,
      isLoading,
      hasFailed,
      removeWord,
      addWord,
      moveWord,
    }),
    [INITIAL_CONTEXT, words, isLoading, removeWord, moveWord, hasFailed]
  )

  return (
    <WordsContext.Provider value={contextValue}>
      {children}
    </WordsContext.Provider>
  )
}
