import { useEffect, useRef } from 'react'

type CallbackFunction = () => void

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: CallbackFunction
) => {
  const callbackRef = useRef<CallbackFunction>()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callbackRef.current?.()
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref])
}

export default useClickOutside
