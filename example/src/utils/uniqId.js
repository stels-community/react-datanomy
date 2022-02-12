const uniqId = (() => {
  
  let COUNTER = 0
  
  return () => {
    const ts = Date.now().toString(36)
    COUNTER = (COUNTER > parseInt('zzzzzz', 36) ? 0 : COUNTER + 1)
    const count = Array.from({ length: 6 - COUNTER.toString(36).length }, () => '0').join('') + COUNTER.toString(36)
    const rnd = Math.random().toString(35).slice(2, 8)
    return `${ts}-${count}-${rnd}`
  }

})()

export default uniqId