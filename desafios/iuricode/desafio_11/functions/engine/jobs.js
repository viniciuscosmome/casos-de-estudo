const createTimer = (time, fn, params) => {
  if (!time || !fn) return

  setTimeout(() => {
    fn(params)
  }, time)
}

const startTimer = () => {
  let timer = setInterval(0)

  timer = setInterval(() => {
    updateTimeDisplay(startTime(), dateNow())

    if (!getStatus())
      return clearInterval(timer)
  }, 1e3)
}
