let counter = 0

const uniqId = () => {
  const ts = Date.now().toString(36)
  counter = (counter > parseInt('zzzzzz', 36) ? 0 : counter + 1)
  const count = Array.from({ length: 6 - counter.toString(36).length }, () => '0').join('') + counter.toString(36)
  const rnd = Math.random().toString(35).slice(2, 8)
  return `${ts}-${count}-${rnd}`
}

export default uniqId