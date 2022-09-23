import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as uuid from 'uuid'
import {
  removeWord,
  addWord,
  moveWord,
  getDisplayableWords,
} from '../WordStorageService'

const uuidSpy = vi.spyOn(uuid, 'v4').mockImplementation(() => 'MOCK_UUID')

const WORDS = [
  {
    id: '1',
    word: 'First',
  },
  {
    id: '2',
    word: 'Second',
  },
]

describe('WordStorageService', () => {
  describe('removeWord', () => {
    it('returns words without word and stores info into storage', () => {
      const words = removeWord({ words: WORDS, version: '123' }, WORDS[1])

      expect(words).toEqual([{ id: '1', word: 'First' }])
      const actions = JSON.parse(
        localStorage.getItem('WORDS_MODIFICATIONS') ?? 'null'
      )['123']
      expect(actions).toContainEqual({ type: 'REMOVE', payload: WORDS[1] })
    })

    it('does not store action into storage when storeAction is false', () => {
      removeWord({ words: WORDS, version: '345', storeAction: false }, WORDS[1])

      const actions = JSON.parse(
        localStorage.getItem('WORDS_MODIFICATIONS') ?? 'null'
      )['345']
      expect(actions).toBeUndefined()
    })
  })

  describe('addWord', () => {
    it('returns words with newly added word in the beginning and stores info into storage', () => {
      const words = addWord({ words: WORDS, version: '123' }, 'Zero')

      expect(words).toEqual([
        {
          word: 'Zero',
          id: 'MOCK_UUID',
        },
        ...WORDS,
      ])
      const actions = JSON.parse(
        localStorage.getItem('WORDS_MODIFICATIONS') ?? 'null'
      )['123']
      expect(actions).toContainEqual({
        type: 'ADD',
        payload: { word: 'Zero', id: 'MOCK_UUID' },
      })
    })

    it('does not store action into storage when storeAction is false', () => {
      addWord({ words: WORDS, version: '345', storeAction: false }, 'Zero')

      const actions = JSON.parse(
        localStorage.getItem('WORDS_MODIFICATIONS') ?? 'null'
      )['345']
      expect(actions).toBeUndefined()
    })
  })

  describe('moveWord', () => {
    it('returns words with new order and stores info into storage', () => {
      const words = moveWord({ words: WORDS, version: '123' }, 0, 1)

      expect(words).toEqual([WORDS[1], WORDS[0]])
      const actions = JSON.parse(
        localStorage.getItem('WORDS_MODIFICATIONS') ?? 'null'
      )['123']
      expect(actions).toContainEqual({
        type: 'MOVE',
        payload: { startIndex: 0, targetIndex: 1 },
      })
    })

    it('does not store action into storage when storeAction is false', () => {
      moveWord({ words: WORDS, version: '345', storeAction: false }, 0, 1)

      const actions = JSON.parse(
        localStorage.getItem('WORDS_MODIFICATIONS') ?? 'null'
      )['345']
      expect(actions).toBeUndefined()
    })
  })

  describe('getDisplayableWords', () => {
    beforeEach(() => {
      uuidSpy.mockRestore()
    })
    it('returns modified words with all stored actions for version', () => {
      let words = addWord({ words: [], version: '111' }, 'First')
      // First
      words = addWord({ words, version: '111' }, 'Second')
      // Second, First
      words = removeWord({ words, version: '111' }, words[0])
      // First
      words = addWord({ words, version: '111' }, 'Third')
      // Third, First
      moveWord({ words, version: '111' }, 0, 1)
      // First, Third

      const recreatedWords = getDisplayableWords([], '111')

      expect(recreatedWords.map(({ word }) => word)).toEqual(['First', 'Third'])
    })
  })
})
