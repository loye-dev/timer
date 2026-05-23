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
  es: {
    start: 'Iniciar',
    pause: 'Pausar',
    reset: 'Restablecer',
    resume: 'Reanudar',
    restart: 'Reiniciar',
    kbdSpace: 'Espacio',
    toStart: 'para iniciar',
    toPause: 'para pausar',
    toResume: 'para reanudar',
    toReset: 'para restablecer',
    hours: 'h',
    minutes: 'min',
    seconds: 'seg',
  },
  it: {
    start: 'Avvia',
    pause: 'Pausa',
    reset: 'Reimposta',
    resume: 'Riprendi',
    restart: 'Riavvia',
    kbdSpace: 'Spazio',
    toStart: 'per avviare',
    toPause: 'per mettere in pausa',
    toResume: 'per riprendere',
    toReset: 'per reimpostare',
    hours: 'h',
    minutes: 'min',
    seconds: 'sec',
  },
  de: {
    start: 'Starten',
    pause: 'Pause',
    reset: 'Zurücksetzen',
    resume: 'Fortsetzen',
    restart: 'Neu starten',
    kbdSpace: 'Leertaste',
    toStart: 'zum Starten',
    toPause: 'zum Pausieren',
    toResume: 'zum Fortsetzen',
    toReset: 'zum Zurücksetzen',
    hours: 'h',
    minutes: 'min',
    seconds: 'Sek',
  },
  pt: {
    start: 'Iniciar',
    pause: 'Pausar',
    reset: 'Redefinir',
    resume: 'Retomar',
    restart: 'Reiniciar',
    kbdSpace: 'Espaço',
    toStart: 'para iniciar',
    toPause: 'para pausar',
    toResume: 'para retomar',
    toReset: 'para redefinir',
    hours: 'h',
    minutes: 'min',
    seconds: 'seg',
  },
}

export type Locale = keyof typeof translations

function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en'
  const lang = navigator.language.toLowerCase()
  if (lang.startsWith('fr')) return 'fr'
  if (lang.startsWith('es')) return 'es'
  if (lang.startsWith('it')) return 'it'
  if (lang.startsWith('de')) return 'de'
  if (lang.startsWith('pt')) return 'pt'
  return 'en'
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
