import { UseKeydownCallback } from '../types'

export const useKeydown = (self: any, keyPressed: string, fn: UseKeydownCallback): void => {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === keyPressed) {
      e.preventDefault()
      fn()
    }
  }

  self.trigger.addEventListener('keydown', onKeyDown)
}
