import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'WORDS_MODIFICATIONS'

type AddPayload = Word
type RemovePayload = Word
type MovePayload = {
  startIndex: number
  targetIndex: number
}

type ActionPayload = AddPayload | RemovePayload | MovePayload
type ActionType = 'ADD' | 'REMOVE' | 'MOVE'

interface Action {
  type: ActionType
  payload: ActionPayload
}
type Storage = Record<string, Action[]>

function isAddAction(
  type: ActionType,
  payload: ActionPayload
): payload is AddPayload {
  return type === 'ADD'
}

function isRemoveAction(
  type: ActionType,
  payload: ActionPayload
): payload is RemovePayload {
  return type === 'REMOVE'
}

function isMoveAction(
  type: ActionType,
  payload: ActionPayload
): payload is RemovePayload {
  return type === 'MOVE'
}

function getStorage(): Storage {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? 'null') ?? {}
}

function getActionsOfVersion(version: string): Action[] {
  return getStorage()[version] ?? []
}

function addAction(version: string, action: Action) {
  const storage = getStorage()
  const actions = getActionsOfVersion(version)
  actions.push(action)
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({
      ...storage,
      [version]: actions,
    })
  )
}

interface ActionOptions {
  words: Word[]
  version: string
  storeAction?: boolean
}

export function removeWord(
  { words, version, storeAction = true }: ActionOptions,
  word: Word
): Word[] {
  if (storeAction) {
    addAction(version, {
      type: 'REMOVE',
      payload: word,
    })
  }
  return words.filter(({ id }) => id !== word.id)
}

export function addWord(
  { words, version, storeAction = true }: ActionOptions,
  newWord: string,
  id: string = uuidv4()
): Word[] {
  const newW = {
    id,
    word: newWord,
  }
  if (storeAction) {
    addAction(version, {
      type: 'ADD',
      payload: newW,
    })
  }
  return [newW, ...words]
}

export function moveWord(
  { words, version, storeAction = true }: ActionOptions,
  startIndex: number,
  targetIndex: number
) {
  if (storeAction) {
    addAction(version, {
      type: 'MOVE',
      payload: {
        startIndex,
        targetIndex,
      },
    })
  }

  const result = Array.from(words)
  const [removed] = result.splice(startIndex, 1)
  result.splice(targetIndex, 0, removed)
  return result
}

export function getDisplayableWords(words: Word[], version: string): Word[] {
  const actions = getActionsOfVersion(version)
  return actions.reduce((newWords, { type, payload }) => {
    const actionOptions = { words: newWords, version, storeAction: false }
    if (isAddAction(type, payload)) {
      return addWord(actionOptions, payload.word, payload.id)
    }
    if (isRemoveAction(type, payload)) {
      return removeWord(actionOptions, payload)
    }

    if (isMoveAction(type, payload)) {
      return moveWord(actionOptions, payload.startIndex, payload.targetIndex)
    }

    return newWords
  }, words)
}
