<script setup lang="ts">
  import NumberFlow from '@number-flow/vue'

  const { t } = useLocale()

  const props = defineProps<{
    hours: number
    minutes: number
    seconds: number
    finished?: boolean
    adjustable?: boolean
    trend?: number
  }>()

  const emit = defineEmits<{
    'adjust-hours': [delta: number]
    'adjust-minutes': [delta: number]
    'adjust-seconds': [delta: number]
  }>()

  function onWheelHours(e: WheelEvent) {
    if (!props.adjustable) return
    e.preventDefault()
    emit('adjust-hours', e.deltaY < 0 ? 1 : -1)
  }

  function onWheelMin(e: WheelEvent) {
    if (!props.adjustable) return
    e.preventDefault()
    emit('adjust-minutes', e.deltaY < 0 ? 1 : -1)
  }

  function onWheelSec(e: WheelEvent) {
    if (!props.adjustable) return
    e.preventDefault()
    emit('adjust-seconds', e.deltaY < 0 ? 1 : -1)
  }
</script>

<template>
  <div class="grid gap-x-1" style="grid-template-columns: auto auto auto auto auto">
    <!-- Row 1: up buttons (adjustable only) -->
    <template v-if="adjustable">
      <div class="py-1">
        <UButton
          icon="tabler:chevron-up"
          variant="ghost"
          size="lg"
          class="w-full cursor-pointer justify-center"
          @click="emit('adjust-hours', 1)"
        />
      </div>
      <div />
      <div class="py-1">
        <UButton
          icon="tabler:chevron-up"
          variant="ghost"
          size="lg"
          class="w-full cursor-pointer justify-center"
          @click="emit('adjust-minutes', 1)"
        />
      </div>
      <div />
      <div class="py-1">
        <UButton
          icon="tabler:chevron-up"
          variant="ghost"
          size="lg"
          class="w-full cursor-pointer justify-center"
          @click="emit('adjust-seconds', 1)"
        />
      </div>
    </template>

    <!-- Row 2: numbers + colons -->
    <div class="flex justify-end" @wheel="onWheelHours">
      <NumberFlow
        :value="hours"
        :format="{ minimumIntegerDigits: 2 }"
        :trend="trend"
        class="cursor-default font-mono text-5xl tabular-nums transition-colors duration-700 sm:text-7xl md:text-8xl"
        :class="finished ? 'text-green-400' : ''"
      />
    </div>
    <div class="flex items-center justify-center px-0.5">
      <span
        class="cursor-default font-mono text-5xl leading-none transition-colors duration-700 sm:text-7xl md:text-8xl"
        :class="finished ? 'text-green-400' : ''"
      >
        :
      </span>
    </div>
    <div class="flex justify-center" @wheel="onWheelMin">
      <NumberFlow
        :value="minutes"
        :format="{ minimumIntegerDigits: 2 }"
        :trend="trend"
        class="cursor-default font-mono text-5xl tabular-nums transition-colors duration-700 sm:text-7xl md:text-8xl"
        :class="finished ? 'text-green-400' : ''"
      />
    </div>
    <div class="flex items-center justify-center px-0.5">
      <span
        class="cursor-default font-mono text-5xl leading-none transition-colors duration-700 sm:text-7xl md:text-8xl"
        :class="finished ? 'text-green-400' : ''"
      >
        :
      </span>
    </div>
    <div class="flex justify-start" @wheel="onWheelSec">
      <NumberFlow
        :value="seconds"
        :format="{ minimumIntegerDigits: 2 }"
        :trend="trend"
        class="cursor-default font-mono text-5xl tabular-nums transition-colors duration-700 sm:text-7xl md:text-8xl"
        :class="finished ? 'text-green-400' : ''"
      />
    </div>

    <!-- Row 3: down buttons (adjustable only) -->
    <template v-if="adjustable">
      <div class="py-1">
        <UButton
          icon="tabler:chevron-down"
          variant="ghost"
          size="lg"
          class="w-full cursor-pointer justify-center"
          @click="emit('adjust-hours', -1)"
        />
      </div>
      <div />
      <div class="py-1">
        <UButton
          icon="tabler:chevron-down"
          variant="ghost"
          size="lg"
          class="w-full cursor-pointer justify-center"
          @click="emit('adjust-minutes', -1)"
        />
      </div>
      <div />
      <div class="py-1">
        <UButton
          icon="tabler:chevron-down"
          variant="ghost"
          size="lg"
          class="w-full cursor-pointer justify-center"
          @click="emit('adjust-seconds', -1)"
        />
      </div>
    </template>

    <!-- Row 4: labels (adjustable only) -->
    <template v-if="adjustable">
      <p class="text-muted cursor-default pt-1 text-center text-xs tracking-widest uppercase">
        {{ t.hours }}
      </p>
      <div />
      <p class="text-muted cursor-default pt-1 text-center text-xs tracking-widest uppercase">
        {{ t.minutes }}
      </p>
      <div />
      <p class="text-muted cursor-default pt-1 text-center text-xs tracking-widest uppercase">
        {{ t.seconds }}
      </p>
    </template>
  </div>
</template>
