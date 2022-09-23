import { configure } from '@testing-library/react'
import { vi } from 'vitest'

// we are fetching from single endpoint so I mock it here
// so I don't need to mock it in each relevant test
global.fetch = vi.fn().mockReturnValue(
  Promise.resolve((resolve) => {
    resolve({
      json: () => ({
        data: [
          {
            id: '1',
            word: 'First',
          },
        ],
        version: '1',
      }),
    })
  })
)

configure({
  testIdAttribute: 'data-cy',
})
