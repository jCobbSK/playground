import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const MAX_NUMBER_OF_DOTS = 3
const TICK_INTERVAL = 300

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoaderOverlay: React.FC<{
  isLoading: boolean
  hasFailed: boolean
}> = ({ isLoading, hasFailed }) => {
  const [tickCount, setTickCount] = useState(0)
  const intervalRef = useRef<NodeJS.Timer>()
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTickCount((ticks) => ticks + 1)
    }, TICK_INTERVAL)

    return () => {
      clearInterval(intervalRef.current)
    }
  })

  if (hasFailed) {
    return (
      <Wrapper data-cy="failed-prompt">
        API request failed. Is your server running?
      </Wrapper>
    )
  }

  if (!isLoading) {
    return null
  }

  const loadingContent = ''.padEnd((tickCount % MAX_NUMBER_OF_DOTS) + 1, '.')
  return <Wrapper data-cy="loader">Loading{loadingContent}</Wrapper>
}
