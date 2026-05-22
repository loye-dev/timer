export type TimerState = 'idle' | 'running' | 'paused' | 'finished'

export function useTimer() {
  const configHours = ref(0)
  const configMinutes = ref(5)
  const configSeconds = ref(0)
  const remaining = ref(0)
  const state = ref<TimerState>('idle')
  let intervalId: ReturnType<typeof setInterval> | null = null

  const totalSeconds = computed(
    () => configHours.value * 3600 + configMinutes.value * 60 + configSeconds.value,
  )

  const displayHours = computed(() =>
    state.value === 'idle' ? configHours.value : Math.floor(remaining.value / 3600),
  )

  const displayMinutes = computed(() =>
    state.value === 'idle' ? configMinutes.value : Math.floor((remaining.value % 3600) / 60),
  )

  const displaySeconds = computed(() =>
    state.value === 'idle' ? configSeconds.value : remaining.value % 60,
  )

  function start() {
    if (state.value === 'idle' || state.value === 'finished') {
      remaining.value = totalSeconds.value
    }
    if (remaining.value === 0) return
    state.value = 'running'
    const deadline = Date.now() + remaining.value * 1000
    intervalId = setInterval(() => {
      remaining.value = Math.ceil((deadline - Date.now()) / 1000)
      if (remaining.value <= 0) {
        remaining.value = 0
        clearInterval(intervalId!)
        intervalId = null
        state.value = 'finished'
      }
    }, 200)
  }

  function pause() {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
    state.value = 'paused'
  }

  function reset() {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
    state.value = 'idle'
    remaining.value = 0
  }

  function adjustHours(delta: number) {
    if (state.value !== 'idle') return
    configHours.value = Math.max(0, Math.min(99, configHours.value + delta))
    if (configHours.value === 0 && configMinutes.value === 0 && configSeconds.value === 0) {
      configSeconds.value = 1
    }
  }

  function adjustMinutes(delta: number) {
    if (state.value !== 'idle') return
    let next = configMinutes.value + delta
    if (next < 0) {
      if (configHours.value > 0) {
        configHours.value--
        next = 59
      } else {
        next = 0
      }
    } else if (next > 59) {
      if (configHours.value < 99) {
        configHours.value++
        next = 0
      } else {
        next = 59
      }
    }
    configMinutes.value = next
    if (configHours.value === 0 && configMinutes.value === 0 && configSeconds.value === 0) {
      configSeconds.value = 1
    }
  }

  function adjustSeconds(delta: number) {
    if (state.value !== 'idle') return
    let next = configSeconds.value + delta
    if (next < 0) {
      if (configMinutes.value > 0 || configHours.value > 0) {
        adjustMinutes(-1)
        next = 59
      } else {
        next = 0
      }
    } else if (next > 59) {
      adjustMinutes(1)
      next = 0
    }
    configSeconds.value = next
    if (configHours.value === 0 && configMinutes.value === 0 && configSeconds.value === 0) {
      configSeconds.value = 1
    }
  }

  onUnmounted(() => {
    if (intervalId !== null) clearInterval(intervalId)
  })

  return {
    configHours,
    configMinutes,
    configSeconds,
    remaining,
    state,
    totalSeconds,
    displayHours,
    displayMinutes,
    displaySeconds,
    start,
    pause,
    reset,
    adjustHours,
    adjustMinutes,
    adjustSeconds,
  }
}
