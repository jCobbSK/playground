import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface WordsCtx {
  words: Word[]
  isLoading: boolean
  addWord(newWord: string): void
  removeWord(word: Word): void
}

interface WordsPayload {
  data: Word[]
  version: string
}

const INITIAL_CONTEXT = {
  words: [],
  isLoading: true,
  addWord: () => {},
  removeWord: () => {},
}

export const WordsContext = React.createContext<WordsCtx>(INITIAL_CONTEXT)

export const WordsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [words, setWords] = useState<Word[]>([])
  const [isLoading, setLoading] = useState(true)
  const abortController = useRef<AbortController>()

  useEffect(() => {
    abortController.current = new AbortController()
    fetch(`http://localhost:8001/api/words`, {
      signal: abortController.current.signal,
    })
      .then<WordsPayload>((response) => response.json())
      .then((data) => {
        setWords(data.data)
        setLoading(false)
      })
      .catch(() => {
        throw new Error('Could not fetch words, is the API running?')
      })

    return () => abortController.current?.abort()
  }, [])

  const removeWord = useCallback((word: Word) => {
    setWords((oldWords) => oldWords.filter(({ id }) => word.id !== id))
  }, [])

  const addWord = useCallback((word: string) => {
    setWords((oldWords) => [{ id: `${Math.random()}`, word }, ...oldWords])
  }, [])

  const contextValue = useMemo(
    () => ({
      ...INITIAL_CONTEXT,
      words,
      isLoading,
      removeWord,
      addWord,
    }),
    [INITIAL_CONTEXT, words, isLoading, removeWord]
  )

  return (
    <WordsContext.Provider value={contextValue}>
      {children}
    </WordsContext.Provider>
  )
}
