import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Layout } from './components/Layout'
import { WordList } from './components/WordList'
import { theme } from './theme'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <WordList />
      </Layout>
    </ThemeProvider>
  )
}
