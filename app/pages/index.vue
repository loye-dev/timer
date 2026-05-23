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
    remaining,
  } = useTimer()

  const endTime = computed(() => {
    if (state.value !== 'running') return null
    return new Date(Date.now() + remaining.value * 1000).toLocaleTimeString(locale.value, {
      hour: '2-digit',
      minute: '2-digit',
    })
  })
  const { launch: launchConfetti, stop: stopConfetti } = useConfetti()
  const { t, locale, setLocale } = useLocale()

  const localeItems = [
    [
      { label: 'English', onSelect: () => setLocale('en') },
      { label: 'Français', onSelect: () => setLocale('fr') },
      { label: 'Español', onSelect: () => setLocale('es') },
      { label: 'Italiano', onSelect: () => setLocale('it') },
      { label: 'Deutsch', onSelect: () => setLocale('de') },
      { label: 'Português', onSelect: () => setLocale('pt') },
    ],
  ]

  const colorMode = useColorMode()

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

    <p v-if="endTime" class="text-muted cursor-default text-xs">{{ t.endsAt }} {{ endTime }}</p>

    <TimerControls
      :state="state"
      :can-start="canStart"
      @start="start"
      @pause="pause"
      @reset="reset"
    />

    <p class="text-muted flex cursor-default items-center gap-1.5 text-xs">
      <UKbd size="sm" :value="t.kbdSpace" />
      {{ state === 'idle' ? t.toStart : state === 'running' ? t.toPause : t.toResume }}
      <span class="mx-0.5">·</span>
      <UKbd size="sm" value="R" />
      {{ t.toReset }}
    </p>
    <UButton
      :icon="colorMode.value === 'dark' ? 'tabler:moon' : 'tabler:sun'"
      variant="ghost"
      color="neutral"
      class="fixed top-4 left-4 opacity-30 hover:opacity-70"
      @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
    />
    <UButton
      :icon="isFullscreen ? 'tabler:minimize' : 'tabler:maximize'"
      variant="ghost"
      color="neutral"
      class="fixed top-4 right-4 opacity-30 hover:opacity-70"
      @click="toggleFullscreen"
    />
    <UDropdownMenu :items="localeItems" :content="{ side: 'top', align: 'start' }">
      <UButton
        variant="ghost"
        color="neutral"
        class="fixed bottom-4 left-4 font-mono text-xs opacity-30 hover:opacity-70"
      >
        {{ locale }}
      </UButton>
    </UDropdownMenu>
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
