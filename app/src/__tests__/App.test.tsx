import React from 'react'
import { describe, expect, it } from 'vitest'
import { screen, render } from '@testing-library/react'

import { App } from '../App'

describe('Main <App /> component', () => {
  it('renders Add button and loader', () => {
    render(<App />)

    expect(screen.getByTestId('add-word-button')).toBeDefined()
    expect(screen.getByTestId('loader')).toBeDefined()
  })
})
