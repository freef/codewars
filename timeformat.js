function formatDuration (sec) {
  const time = {
    year : Math.floor(sec/3.154e+7),
    day : Math.floor(sec/86400)%365,
    hour : Math.floor(sec/3600)%24,
    minute : Math.floor(sec/60 )%60,
    second : sec%60,
  }
  const formatted = Object.keys(time).map(k => (time[k]>0 ? `${time[k]} ${time[k]>1 ? k+ 's' : k}` : '')).filter(word => word !== '').join(', ').replace(/^(.*)(\,)(.[\w ]*)$/g, `$1 and$3`)
  return formatted !== '' ? formatted : 'now'
}

