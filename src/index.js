import css from './style.css'
import flowchart from 'flowchart.js'

const block = function (el, config) {
  const child = document.createElement('div')
  child.classList.add(css.flowchartjs)

  const canvas = document.createElement('div')
  canvas.classList.add(css.canvas)
  child.appendChild(canvas)

  el.appendChild(child)

  let def = config.config

  const createChart = () => {
    setTimeout(() => {
      const flowcode = flowchart.parse(def)
      flowcode.drawSVG(canvas, config.style)
    })
  }

  if (def) {
    createChart()
  } else {
    if (config._cache) {
      def = config._cache
      createChart()
    } else {
      // fallback to direct loading
      fetch(config.url)
        .then(resp => resp.text())
        .then(data => {
          config._cache = data
          def = data
          createChart()
        })
    }
  }
}

export default block

block.install = Presenta => {
  Presenta.addBlock('flowchartjs', block)
  if (Presenta.io.addCache) Presenta.io.addCache({ type: 'flowchartjs', field: 'url' })
}

if (typeof window !== 'undefined' && window.Presenta) {
  window.Presenta.use(block)
}
