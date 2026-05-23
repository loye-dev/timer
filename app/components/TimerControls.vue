<script setup lang="ts">
  import type { TimerState } from '~/composables/useTimer'

  defineProps<{
    state: TimerState
    canStart: boolean
  }>()

  const emit = defineEmits<{
    start: []
    pause: []
    reset: []
  }>()

  const { t } = useLocale()
</script>

<template>
  <div class="flex items-center gap-3">
    <!-- Start / Resume / Restart -->
    <UButton
      v-if="state !== 'running'"
      icon="tabler:player-play-filled"
      size="xl"
      class="cursor-pointer"
      :disabled="!canStart"
      @click="emit('start')"
    >
      {{ state === 'paused' ? t.resume : state === 'finished' ? t.restart : t.start }}
    </UButton>

    <!-- Pause -->
    <UButton
      v-if="state === 'running'"
      icon="tabler:player-pause-filled"
      size="xl"
      class="cursor-pointer"
      color="neutral"
      variant="outline"
      @click="emit('pause')"
    >
      {{ t.pause }}
    </UButton>

    <!-- Reset -->
    <UButton
      v-if="state !== 'idle'"
      icon="tabler:refresh"
      size="xl"
      class="cursor-pointer"
      color="neutral"
      variant="ghost"
      @click="emit('reset')"
    >
      {{ t.reset }}
    </UButton>
  </div>
</template>
