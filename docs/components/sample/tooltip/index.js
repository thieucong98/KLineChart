const js = `
import { init } from 'klinecharts'

function genData (timestamp = new Date().getTime(), length = 800) {
  let basePrice = 5000
  timestamp = Math.floor(timestamp / 1000 / 60) * 60 * 1000 - length * 60 * 1000
  const dataList = []
  for (let i = 0; i < length; i++) {
    const prices = []
    for (let j = 0; j < 4; j++) {
      prices.push(basePrice + Math.random() * 60 - 30)
    }
    prices.sort()
    const open = +(prices[Math.round(Math.random() * 3)].toFixed(2))
    const high = +(prices[3].toFixed(2))
    const low = +(prices[0].toFixed(2))
    const close = +(prices[Math.round(Math.random() * 3)].toFixed(2))
    const volume = Math.round(Math.random() * 100) + 10
    const turnover = (open + high + low + close) / 4 * volume
    dataList.push({ timestamp, open, high,low, close, volume, turnover })

    basePrice = close
    timestamp += 60 * 1000
  }
  return dataList
}

const chart = init('k-line-chart')
chart.createIndicator('MA', false, { id: 'candle_pane' })
chart.createIndicator('VOL')
chart.applyNewData(genData())

function setCandleTooltipShowRule (showRule) {
  chart.setStyles({
    candle: {
      tooltip: {
        showRule
      }
    }
  })
}

function setCandleTooltipShowType (showType) {
  chart.setStyles({
    candle: {
      tooltip: {
        showType
      }
    }
  })
}

function setIndicatorTooltipShowRule (showRule) {
  chart.setStyles({
    indicator: {
      tooltip: {
        showRule
      }
    }
  })
}

function setIndicatorTooltipShowType (showType) {
  chart.setStyles({
    indicator: {
      tooltip: {
        showType
      }
    }
  })
}

// 添加演示代码
const container = document.getElementById('container')
const rules = [
  { key: 'always', text: '总是显示' },
  { key: 'follow_cross', text: '跟随十字光标' },
  { key: 'none', text: '不显示' }
]
const types = [
  { key: 'standard', text: '默认' },
  { key: 'rect', text: '矩形框' }
]

const baseButtonContainer = document.createElement('div')
baseButtonContainer.className = 'button-container'
const baseTitle = document.createElement('span')
baseTitle.innerText = '基础信息提示：'
baseButtonContainer.appendChild(baseTitle)

rules.forEach(({ key, text }) => {
  const button = document.createElement('button')
  button.innerText = text
  button.addEventListener('click', () => { setCandleTooltipShowRule(key) })
  baseButtonContainer.appendChild(button)
})

types.forEach(({ key, text }) => {
  const button = document.createElement('button')
  button.innerText = text
  button.addEventListener('click', () => { setCandleTooltipShowType(key) })
  baseButtonContainer.appendChild(button)
})
container.appendChild(baseButtonContainer)

const indicatorButtonContainer = document.createElement('div')
indicatorButtonContainer.className = 'button-container'
const indicatorTitle = document.createElement('span')
indicatorTitle.innerText = '指标信息提示：'
indicatorButtonContainer.appendChild(indicatorTitle)

rules.forEach(({ key, text }) => {
  const button = document.createElement('button')
  button.innerText = text
  button.addEventListener('click', () => { setIndicatorTooltipShowRule(key) })
  indicatorButtonContainer.appendChild(button)
})

types.forEach(({ key, text }) => {
  const button = document.createElement('button')
  button.innerText = text
  button.addEventListener('click', () => { setIndicatorTooltipShowType(key) })
  indicatorButtonContainer.appendChild(button)
})
container.appendChild(indicatorButtonContainer)
`

const css = `
.button-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  padding: 10px 22px;
}

.button-container:last-child {
  margin-top: 0;
}

.button-container button {
  padding: 2px 6px;
  background-color: #1677FF;
  border-radius: 4px;
  font-size: 12px;
  color: #fff;
  outline: none;
}
`

const html = `
<div id="container">
  <div id="k-line-chart" style="height:430px">
</div>
`

export { js, css, html }