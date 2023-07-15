export const floatCalculator = function (node: HTMLElement) {
  const parentNode = node.parentNode as HTMLElement
  const nextElementSibling = node.nextElementSibling as HTMLElement

  let parentIntersecting: boolean = false,
    nodeIntersecting: boolean = false

  const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.target.nodeName === 'SVEAINTERSECTSENTINEL') {
        nodeIntersecting = entry.isIntersecting
      } else {
        parentIntersecting = entry.isIntersecting
      }
    })

    const isFloating = nodeIntersecting !== parentIntersecting

    const computedStyle = getComputedStyle(parentNode)
    if (isFloating) {
      nextElementSibling.style.paddingTop = `${node.offsetHeight}px`
      node.style.width = `${parentNode.offsetWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight)}px`
    } else {
      nextElementSibling.style.paddingTop = '0'
      node.style.width = '100%'
    }

    node.dispatchEvent(new CustomEvent('floatChange', {
      detail: {
        isFloating
      }
    }))
  }

  const intersectSentinelTop = document.createElement('sveaintersectsentinel')
  intersectSentinelTop.style.height = `${node.offsetHeight}px`
  node.parentNode.prepend(intersectSentinelTop)

  const intersectionObserver = new IntersectionObserver(
    intersectionCallback,
    {}
  )

  intersectionObserver.observe(intersectSentinelTop)
  intersectionObserver.observe(parentNode)
}