<script setup lang="ts">
  const {
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
  } = useTimer()
  const { launch: launchConfetti, stop: stopConfetti } = useConfetti()

  const isFullscreen = ref(false)

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  onMounted(() => {
    document.addEventListener('fullscreenchange', () => {
      isFullscreen.value = !!document.fullscreenElement
    })
  })

  watch(state, (newState) => {
    if (newState === 'finished') launchConfetti()
    if (newState === 'idle') stopConfetti()
  })

  const canStart = computed(() => totalSeconds.value > 0)

  // trend=-1 forces countdown spin direction when running
  // undefined = default (sign of change) for idle adjustments and restart animation
  const displayTrend = computed(() => (state.value === 'running' ? -1 : undefined))

  function onKeydown(e: KeyboardEvent) {
    if (e.target instanceof HTMLButtonElement) return
    if (e.code === 'Space') {
      e.preventDefault()
      if (state.value === 'running') pause()
      else if (canStart.value) start()
    }
    if (e.code === 'KeyR' && state.value !== 'idle') {
      e.preventDefault()
      reset()
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeydown))
  onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="flex min-h-svh flex-col items-center justify-center gap-10 p-6">
    <TimerDisplay
      :hours="displayHours"
      :minutes="displayMinutes"
      :seconds="displaySeconds"
      :finished="state === 'finished'"
      :adjustable="state === 'idle'"
      :trend="displayTrend"
      @adjust-hours="adjustHours"
      @adjust-minutes="adjustMinutes"
      @adjust-seconds="adjustSeconds"
    />

    <TimerControls
      :state="state"
      :can-start="canStart"
      @start="start"
      @pause="pause"
      @reset="reset"
    />

    <p class="text-muted flex cursor-default items-center gap-1.5 text-xs">
      <UKbd size="sm" value="space" />
      to {{ state === 'idle' ? 'start' : state === 'running' ? 'pause' : 'resume' }}
      <span class="mx-0.5">·</span>
      <UKbd size="sm" value="R" />
      to reset
    </p>
    <UButton
      :icon="isFullscreen ? 'tabler:minimize' : 'tabler:maximize'"
      variant="ghost"
      color="neutral"
      class="fixed top-4 right-4 opacity-30 hover:opacity-70"
      @click="toggleFullscreen"
    />
    <UButton
      to="https://github.com/loye-dev/timer"
      target="_blank"
      icon="simple-icons:github"
      variant="ghost"
      color="neutral"
      class="fixed right-4 bottom-4 opacity-30 hover:opacity-70"
    />
  </div>
</template>
