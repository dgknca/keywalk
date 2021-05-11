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
  items: NodeListOf<Element> | Array<any>
  focusedItemIdx: number
  activeClass: string
  selectKey: string

  constructor(args: IArgs) {
    const {
      activeClass = 'active',
      trigger = document,
      container,
      selectKey = 'Enter'
    } = args

    this.args = args
    this.trigger = document.querySelector(trigger) as HTMLElement
    this.items = []
    this.container = container
    this.activeClass = activeClass
    this.selectKey = selectKey

    this.selectAllItems()

    this.focusedItemIdx = -1

    useKeydown(this, 'ArrowDown', () => this.focusNextItem())
    useKeydown(this, 'ArrowUp', () => this.focusPreviousItem())
    useKeydown(this, this.selectKey, () =>
      this.emitOnSelect(this.focusedItemIdx)
    )

    // identify an element to observe
    const elementToObserve = document.querySelector(
      this.container
    ) as HTMLElement

    // create a new instance of 'MutationObserver' named 'observer',
    // passing it a callback function
    const observer = new MutationObserver((lst) => {
      console.log('lst: ', lst);
      this.selectAllItems()
    })

    // call 'observe' on that MutationObserver instance,
    // passing it the element to observe, and the options object
    observer.observe(elementToObserve, {
      characterData: false,
      childList: true,
      attributes: false
    })
  }

  private selectAllItems(): void {
    this.items = document.querySelectorAll(`${this.container} > *`)
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
