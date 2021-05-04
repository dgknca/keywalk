import { useKeydown } from './utils/useKeydown'
import { onWalkFunction, onSelectFunction } from './types'

interface IArgs {
  trigger?: any
  container: string
  activeClass?: string
  onWalk?: onWalkFunction
  onSelect?: onSelectFunction
  selectKey?: string
}

export default class Keywalk {
  args: any
  trigger?: any
  container: string
  items: NodeListOf<Element>
  focusedItemIdx: number
  activeClass: string
  selectKey: string

  constructor(args: IArgs) {
    const { activeClass = 'active', trigger = document, container, selectKey = 'Enter' } = args

    this.args = args
    this.trigger = document.querySelector(trigger) as HTMLElement
    this.container = container
    this.activeClass = activeClass
    this.selectKey = selectKey

    this.items = document.querySelectorAll(`${container} > *`)
    this.focusedItemIdx = -1

    useKeydown(this, 'ArrowDown', () => this.focusNextItem())
    useKeydown(this, 'ArrowUp', () => this.focusPreviousItem())
    useKeydown(this, this.selectKey, () => this.emitOnSelect(this.focusedItemIdx))
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
    this.emitOnWalk(index)
  }

  private emitOnWalk(index: number): void {
    this.args.onWalk(this.items[index], index)
  }

  private emitOnSelect(index: number): void {
    this.args.onSelect(this.items[index], index)
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
