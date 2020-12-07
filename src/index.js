import css from './style.css'
import flowchart from 'flowchart.js'

const block = function (el, config) {
  const child = document.createElement('div')
  child.classList.add(css.flowchartjs)

  const canvas = document.createElement('div')
  canvas.classList.add(css.canvas)
  child.appendChild(canvas)

  el.appendChild(child)

  // required otherwise the rendering is wrong
  setTimeout(() => {
    const flowcode = flowchart.parse(config.config)
    flowcode.drawSVG(canvas, config.style)
  })
}

export default block

block.install = Presenta => {
  Presenta.addBlock('flowchartjs', block)
}

if (typeof window !== 'undefined' && window.Presenta) {
  window.Presenta.use(block)
}
