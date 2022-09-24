import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { describe, it, expect, vi } from 'vitest'

import * as useWords from '../../hooks/useWords'
import { CreateWordButton } from '../CreateWordButton'

vi.spyOn(useWords, 'useWords').mockReturnValue({
  addWord: () => {},
  // eslint-disable-next-line
} as any)
vi.useFakeTimers()

describe('<CreateWordButton />', () => {
  it('renders button without input by default', () => {
    render(<CreateWordButton />)

    expect(screen.getByTestId('add-word-button')).toBeDefined()
    expect(screen.queryByTestId('add-word-input')).toBeNull()
  })

  it('renders text input after the click and closes with escape', async () => {
    render(<CreateWordButton />)

    act(() => {
      fireEvent.click(screen.getByTestId('add-word-button'))
    })

    expect(screen.getByTestId('add-word-button')).toBeDefined()
    expect(await screen.findByTestId('add-word-input')).toBeDefined()

    act(() => {
      fireEvent.keyDown(document.activeElement || document.body, {
        key: 'Escape',
      })
    })

    // we need to flush animation
    vi.runAllTimers()

    expect(await screen.findByTestId('add-word-button')).toBeDefined()
    expect(await screen.queryByTestId('add-word-input')).toBeNull()
  })
})
