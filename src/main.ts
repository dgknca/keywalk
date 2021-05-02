import { useKeydown } from './utils/useKeydown'
import { OnChangeFunction } from './types'

interface IArgs {
  trigger?: any
  container: string
  activeClass?: string
  onChange?: OnChangeFunction
}

export default class Keywalk {
  args: any
  trigger?: any
  container: string
  items: NodeListOf<Element>
  focusedItemIdx: number
  activeClass: string

  constructor(args: IArgs) {
    const { activeClass = 'active', trigger = document, container } = args

    this.args = args
    this.trigger = document.querySelector(trigger) as HTMLInputElement
    this.container = container
    this.activeClass = activeClass

    this.items = document.querySelectorAll(`${container} > *`)
    this.focusedItemIdx = -1

    useKeydown(this, 'ArrowDown', () => this.focusNextItem())
    useKeydown(this, 'ArrowUp', () => this.focusPreviousItem())
  }

  private focusPreviousItem(): void {
    this.focusedItemIdx > 0
      ? this.focusItemByIndex(this.focusedItemIdx - 1)
      : this.focusItemByIndex(this.items.length - 1)
  }

  private focusNextItem(): void {
    this.focusedItemIdx !== this.items.length - 1
      ? this.focusItemByIndex(this.focusedItemIdx + 1)
      : this.focusItemByIndex(0)
  }

  private focusItemByIndex(index = 0): void {
    this.removeAllActiveClasses(index)
    this.addActiveClass(index)
    this.focusedItemIdx = index
    this.returnSelectedElement(index)
  }

  private returnSelectedElement(index: number): void {
    this.args.onChange(this.items[index], index)
  }

  private removeAllActiveClasses(index: number): void {
    this.items.forEach((el: any, i: number) => {
      if (index !== i) el.classList.remove(this.activeClass)
    })
  }

  private addActiveClass(index: number): void {
    this.items[index].classList.add(this.activeClass)
  }

  public reset(): void {
    this.removeAllActiveClasses(-1)
    this.focusedItemIdx = -1
  }
}
