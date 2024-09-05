import {
  ScrollData,
} from './types.js'

export const getWindowScroll = (baseElement: HTMLElement) : ScrollData => {
  const scroll = {
    scrollX: 0,
    scrollY: 0
  }

  while (baseElement
    && baseElement !== document.body) {
    scroll.scrollX += baseElement.scrollLeft
    scroll.scrollY += baseElement.scrollTop
    baseElement = baseElement.parentNode as HTMLElement
  }

  scroll.scrollX += document.body.scrollLeft
  scroll.scrollY += document.body.scrollTop
  return scroll
}