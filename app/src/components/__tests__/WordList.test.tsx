import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, it, expect, vi } from 'vitest'

import * as useWords from '../../hooks/useWords'
import { WordList } from '../WordList'

const useWordsSpy = vi.spyOn(useWords, 'useWords')
const USE_WORDS_RETURN_MOCK = {
  words: [
    {
      id: 'ID',
      word: 'Word',
    },
  ],
  isLoading: false,
  hasFailed: false,
  removeWord: () => {},
  addWord: () => {},
  moveWord: () => {},
}

describe('<WordList />', () => {
  it('shows loading state when data are being loaded', () => {
    useWordsSpy.mockReturnValue({
      ...USE_WORDS_RETURN_MOCK,
      isLoading: true,
    })

    render(<WordList />)

    expect(screen.getByTestId('loader')).toBeDefined()
  })

  it('shows error message when fetching failed', () => {
    useWordsSpy.mockReturnValue({
      ...USE_WORDS_RETURN_MOCK,
      hasFailed: true,
    })

    render(<WordList />)

    expect(screen.getByTestId('failed-prompt')).toBeDefined()
  })

  it('shows virtual list with data', () => {
    useWordsSpy.mockReturnValue(USE_WORDS_RETURN_MOCK)

    render(<WordList />)

    expect(screen.getByTestId('word-item-ID')).toBeDefined()
  })
})
