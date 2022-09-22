import { useContext } from 'react'
import { WordsContext } from '../providers/WordsProvider'

export const useWords = () => useContext(WordsContext)
