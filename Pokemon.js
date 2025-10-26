import { generateLog, renderLog } from './utils.js'

export default class Pokemon {
  constructor ({ name, id }) {
    this.name = name
    this.id = id
    this.defaultHP = 100
    this.damageHP = 100
    this.lost = false
    this.elHP = document.getElementById(`health-${id}`)
    this.elProgressbar = document.getElementById(`progressbar-${id}`)
  }

  renderHPLife () {
    this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`
  }

  renderProgressbarHP () {
    this.elProgressbar.style.width = `${this.damageHP}%`
    if (this.damageHP > 60) this.elProgressbar.style.background = '#24db2aff'
    else if (this.damageHP > 30) this.elProgressbar.style.background = '#FF9800'
    else this.elProgressbar.style.background = '#F44336'
  }

  renderHP () {
    this.renderHPLife()
    this.renderProgressbarHP()
  }

  changeHP (count, enemy) {
    if (this.damageHP <= count) {
      this.damageHP = 0
      this.renderHP()
      if (!this.lost) {
        alert(`Бідний ${this.name} програв бій!`)
        this.lost = true
      }
    } else {
      this.damageHP -= count
      this.renderHP()
      const log = generateLog(enemy, this, count, this.damageHP, this.defaultHP)
      renderLog(log)
    }
  }
}
