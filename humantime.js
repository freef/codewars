function humanReadable(seconds) {
  const addZero = (v) => v > 10 ? v : '0'+ v
  const hrs = Math.floor(seconds/ 3600)
  const min = Math.floor((seconds/60)-(hrs*60))
  const sec = Math.floor(seconds-(hrs*3600+min*60))
  return `${addZero(hrs)}:${addZero(min)}:${addZero(sec)}`
}
