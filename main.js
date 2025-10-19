const $btnKick = document.getElementById('btn-kick')
const $btnQuick = document.getElementById('btn-quick')
const $logs = document.getElementById('logs')

function random (num) {
  return Math.ceil(Math.random() * num)
}

function generateLog (firstPerson, secondPerson, damage, hpLeft, hpTotal) {
  const { name: name1 } = firstPerson
  const { name: name2 } = secondPerson
  const logs = [
    `${name1} вирішив відпочити, але ${name2} не пропустив шанс ударити.`,
    `${name1} кліпнув очима, а ${name2} використав це, щоб завдати потужного удару.`,
    `${name1} промовив «Піка-Пі!», але ${name2} відповів атакою.`,
    `${name1} послизнувся, і ${name2} без вагань наніс точний удар.`,
    `${name1} усміхнувся, а ${name2} вирішив, що час діяти — удар!`,
    `${name1} відволікся на метелика, ${name2} скористався моментом.`,
    `${name1} втомився, а ${name2} провів серію швидких атак.`,
    `${name1} зробив крок уперед, але ${name2} був на крок попереду.`,
    `${name1} підняв хвіст, але ${name2} вже атакував.`,
    `${name1} приготувався до захисту, проте ${name2} пробив оборону.`
  ]
  const text = logs[random(logs.length) - 1]
  return `${text} -${damage} [${hpLeft}/${hpTotal}]`
}

function renderLog (text) {
  const p = document.createElement('p')
  p.innerText = text
  $logs.insertBefore(p, $logs.firstChild)
}

function createPlayer ({ name, id }) {
  const elHP = document.getElementById(`health-${id}`)
  const elProgressbar = document.getElementById(`progressbar-${id}`)
  return {
    name,
    defaultHP: 100,
    damageHP: 100,
    lost: false,
    elHP,
    elProgressbar,
    renderHPLife () {
      this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`
    },
    renderProgressbarHP () {
      this.elProgressbar.style.width = `${this.damageHP}%`
      if (this.damageHP > 60) {
        this.elProgressbar.style.background = '#24db2aff'
      } else if (this.damageHP > 30) {
        this.elProgressbar.style.background = '#FF9800'
      } else {
        this.elProgressbar.style.background = '#F44336'
      }
    },
    renderHP () {
      this.renderHPLife()
      this.renderProgressbarHP()
    },
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
        const log = generateLog(
          enemy,
          this,
          count,
          this.damageHP,
          this.defaultHP
        )
        renderLog(log)
      }
    }
  }
}

const character = createPlayer({ name: 'Pikachu', id: 'character' })
const enemy1 = createPlayer({ name: 'Squirtle', id: 'enemy1' })
const enemy2 = createPlayer({ name: 'Wobbuffet', id: 'enemy2' })

function attack (attacker, defender, maxDamage) {
  const damage = random(maxDamage)
  defender.changeHP(damage, attacker)
}

const createClickCounter = (button, maxClicks) => {
  let clicks = 0
  const originalText = button.innerText
  return () => {
    if (clicks < maxClicks) {
      clicks++
      const remaining = maxClicks - clicks
      console.log(`Кнопка "${originalText}": натискань ${clicks}/${maxClicks}`)
      button.innerText = `${originalText} (${remaining} залишилось)`
      if (clicks === maxClicks) {
        button.disabled = true
        button.style.opacity = '0.6'
        button.innerText = `${originalText} (0 залишилось)`
        console.log(`Кнопка "${originalText}" більше не активна`)
      }
      return true
    }
    return false
  }
}

const kickCounter = createClickCounter($btnKick, 7)
const quickCounter = createClickCounter($btnQuick, 7)

$btnKick.addEventListener('click', () => {
  if (kickCounter()) {
    console.log('Thunder Jolt!')
    attack(character, enemy1, 20)
    attack(character, enemy2, 20)
  }
})

$btnQuick.addEventListener('click', () => {
  if (quickCounter()) {
    console.log('Quick Attack!')
    attack(character, enemy1, 10)
    attack(character, enemy2, 10)
  }
})

function init () {
  console.log('Start Game!')
  character.renderHP()
  enemy1.renderHP()
  enemy2.renderHP()
}

init()
