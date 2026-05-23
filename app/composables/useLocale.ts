const translations = {
  en: {
    start: 'Start',
    pause: 'Pause',
    reset: 'Reset',
    resume: 'Resume',
    restart: 'Restart',
    kbdSpace: 'Space',
    toStart: 'to start',
    toPause: 'to pause',
    toResume: 'to resume',
    toReset: 'to reset',
    hours: 'h',
    minutes: 'min',
    seconds: 'sec',
  },
  fr: {
    start: 'Démarrer',
    pause: 'Pause',
    reset: 'Réinitialiser',
    resume: 'Reprendre',
    restart: 'Relancer',
    kbdSpace: 'Espace',
    toStart: 'pour démarrer',
    toPause: 'pour mettre en pause',
    toResume: 'pour reprendre',
    toReset: 'pour réinitialiser',
    hours: 'h',
    minutes: 'min',
    seconds: 'sec',
  },
}

export type Locale = keyof typeof translations

function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en'
  return navigator.language.startsWith('fr') ? 'fr' : 'en'
}

const locale = ref<Locale>('en')

export function useLocale() {
  onMounted(() => {
    locale.value = detectLocale()
  })

  const t = computed(() => translations[locale.value])

  function setLocale(l: Locale) {
    locale.value = l
  }

  return { locale, t, setLocale }
}
