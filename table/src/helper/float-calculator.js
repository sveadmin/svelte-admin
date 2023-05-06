export const floatCalculator = function (node) {
  const intersectionCallback = entries => {
    entries.forEach(entry => {
      if (entry.target.nodeName === 'INTERSECTSENTINEL') {
        nodeIntersecting = entry.isIntersecting
      } else {
        parentIntersecting = entry.isIntersecting
      }
    })

    const isFloating = !!nodeIntersecting ^ parentIntersecting

    const computedStyle = getComputedStyle(node.parentNode)
    if (isFloating) {
      node.nextElementSibling.style.paddingTop = `${node.offsetHeight}px`
      node.style.width = `${node.parentNode.offsetWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight)}px`
    } else {
      node.nextElementSibling.style.paddingTop = 0
      node.style.width = '100%'
    }

    node.dispatchEvent(new CustomEvent('floatChange', {
      detail: {
        isFloating
      }
    }))
  }
  let parentIntersecting = false
  let nodeIntersecting = false

  const intersectSentinelTop = document.createElement('intersectSentinel')
  intersectSentinelTop.style.height = `${node.offsetHeight}px`
  node.parentNode.prepend(intersectSentinelTop)

  const intersectionObserver = new IntersectionObserver(
    intersectionCallback,
    {}
  )

  intersectionObserver.observe(intersectSentinelTop)
  intersectionObserver.observe(node.parentNode)
}