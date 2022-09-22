import React from 'react'
import { describe, expect, it } from 'vitest'
import { screen, render } from '@testing-library/react'

import App from '../App'

describe('Main component', () => {
  it('renders <App />', () => {
    render(<App />)

    expect(screen.getByText('count is 0')).toBeDefined()
  })
})
