import { random } from './utils.js'
import Pokemon from './Pokemon.js'

const $btnKick = document.getElementById('btn-kick')
const $btnQuick = document.getElementById('btn-quick')

const character = new Pokemon({ name: 'Pikachu', id: 'character' })
const enemy1 = new Pokemon({ name: 'Squirtle', id: 'enemy1' })
const enemy2 = new Pokemon({ name: 'Wobbuffet', id: 'enemy2' })

function attack (attacker, defender, maxDamage) {
  const damage = random(maxDamage)
  defender.changeHP(damage, attacker)
}

function createClickCounter (button, maxClicks) {
  let clicks = 0
  const originalText = button.innerText
  return () => {
    if (clicks < maxClicks) {
      clicks++
      const remaining = maxClicks - clicks
      button.innerText = `${originalText} (${remaining} залишилось)`
      if (clicks === maxClicks) {
        button.disabled = true
        button.style.opacity = '0.6'
        button.innerText = `${originalText} (0 залишилось)`
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
    attack(character, enemy1, 20)
    attack(character, enemy2, 20)
  }
})

$btnQuick.addEventListener('click', () => {
  if (quickCounter()) {
    attack(character, enemy1, 10)
    attack(character, enemy2, 10)
  }
})

function init () {
  character.renderHP()
  enemy1.renderHP()
  enemy2.renderHP()
}

init()
