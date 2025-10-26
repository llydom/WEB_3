export function random (num) {
  return Math.ceil(Math.random() * num)
}

export function generateLog (
  firstPerson,
  secondPerson,
  damage,
  hpLeft,
  hpTotal
) {
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

export function renderLog (text) {
  const $logs = document.getElementById('logs')
  const p = document.createElement('p')
  p.innerText = text
  $logs.insertBefore(p, $logs.firstChild)
}
