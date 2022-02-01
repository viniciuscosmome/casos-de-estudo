let allCardsInPlay = []

const setInitialControls = () => {
  const levelButtons = document.querySelectorAll('#level-select-buttons .select-item')
  const restartLevel = document.querySelector('#continue')

  levelButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      initGameConfig(index)
      allCardsInPlay = queryAllElement('.card')
    })
  })

  restartLevel.addEventListener('click', () => {
    resetGame()
    restart()
    updateEndScreen(false)
  })
}

window.addEventListener('load', setInitialControls)
