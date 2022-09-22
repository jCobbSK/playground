import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Layout } from './components/Layout'
import { WordList } from './components/WordList'
import { WordsProvider } from './providers/WordsProvider'
import { theme } from './theme'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <WordsProvider>
        <Layout>
          <WordList />
        </Layout>
      </WordsProvider>
    </ThemeProvider>
  )
}
