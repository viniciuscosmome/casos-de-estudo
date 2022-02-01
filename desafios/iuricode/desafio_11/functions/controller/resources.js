const loadResources = () => {
  const levels = [
    {
      pairPerCard: 1,
      bonusAmountLimit: {
        min: 2,
        max: 3,
      },
      bonusEffectTime: 5e3,
      timeToUntap: 5e3,
    },
    {
      pairPerCard: 2,
      bonusAmountLimit: {
        min: 1,
        max: 3,
      },
      bonusEffectTime: 4e3,
      timeToUntap: 4e3,
    },
    {
      pairPerCard: 3,
      bonusAmountLimit: {
        min: 1,
        max: 1,
      },
      bonusEffectTime: 3e3,
      timeToUntap: 3e4,
    },
  ]

  const images = [
    "book.png",
    "coffin.png",
    "eye.png",
    "hat.png",
    "pumpkin.png",
    "scarecows.png",
    "ted.png",
    "witch.png",
    "zoombie.png",
  ]

  const bonusImage = "look.png"

  return {
    levels,
    images,
    bonusImage,
  }
}
