import confetti from 'canvas-confetti'

export function useConfetti() {
  let frameId: number | null = null

  function launch() {
    const end = Date.now() + 4000

    function frame() {
      confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 } })
      confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 } })
      if (Date.now() < end) frameId = requestAnimationFrame(frame)
    }

    frameId = requestAnimationFrame(frame)
  }

  function stop() {
    if (frameId !== null) {
      cancelAnimationFrame(frameId)
      frameId = null
    }
    confetti.reset()
  }

  onUnmounted(stop)

  return { launch, stop }
}
