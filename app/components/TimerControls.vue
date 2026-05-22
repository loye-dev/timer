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
      {{ state === 'paused' ? 'Reprendre' : state === 'finished' ? 'Relancer' : 'Démarrer' }}
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
      Pause
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
      Réinitialiser
    </UButton>
  </div>
</template>
