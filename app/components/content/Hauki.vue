<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'
import { useDebounceFn } from '@vueuse/core'

const props = withDefaults(defineProps<{
  maxLength?: number
  showStats?: boolean
  autoAnalyze?: boolean
}>(), {
  maxLength: 200,
  showStats: true,
  autoAnalyze: false
})

const { t } = useI18n()
const smash = ref('')
const result = ref<ReturnType<typeof analyze> | null>(null)
const isAnalyzing = ref(false)
const shakeKey = ref(0)

interface SmashStats {
  chaosScore: number
  desperationScore: number
  poetryScore: number
  energyScore: number
  len: number
  special: number
  consecutive: number
}

interface EmotionStats {
  chaosScore: number
  desperationScore: number
  energyScore: number
  special: number
  len: number
}

function longestRun(s: string) {
  let max = 1, cur = 1
  for (let i = 1; i < s.length; i++) {
    cur = s[i] === s[i - 1] ? cur + 1 : 1
    if (cur > max) max = cur
  }
  return s.length ? max : 0
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}

function analyze(input: string) {
  const len = input.length
  const upper = (input.match(/[A-Z]/g) ?? []).length
  const lower = (input.match(/[a-z]/g) ?? []).length
  const special = (input.match(/[^a-zA-Z0-9]/g) ?? []).length
  const spaces = (input.match(/ /g) ?? []).length
  const consecutive = longestRun(input)
  const uniqueChars = new Set(input.replace(/ /g, '')).size

  const chaosScore = clamp(Math.round((special * 4 + upper * 2 + consecutive * 3 - uniqueChars) / Math.max(len, 1) * 100), 0, 100)
  const desperationScore = clamp(Math.round((len / 3 + consecutive * 5 + upper * 1.5) / 10), 0, 100)
  const poetryScore = clamp(Math.round((uniqueChars * 3 + spaces * 8 - special * 2) / Math.max(len, 1) * 100), 0, 100)
  const energyScore = clamp(Math.round((upper / Math.max(lower + upper, 1)) * 100), 0, 100)

  const smashKey = classifySmash({ chaosScore, desperationScore, poetryScore, energyScore, len, special, consecutive })
  const emotionKey = detectEmotion({ chaosScore, desperationScore, energyScore, special, len })
  const certKey = certify(smashKey)
  const verdict = generateVerdict(smashKey, desperationScore)

  return { chaosScore, desperationScore, poetryScore, energyScore, smashKey, emotionKey, certKey, verdict, len, uniqueChars, consecutive }
}

function classifySmash({ chaosScore, desperationScore, poetryScore, energyScore, len, special, consecutive }: SmashStats): string {
  if (len < 4) return 'timid'
  if (consecutive >= 6) return 'broken'
  if (special > len * 0.4) return 'punctuation'
  if (energyScore > 80) return 'screamer'
  if (chaosScore > 70) return 'bedlam'
  if (poetryScore > 65) return 'haiku'
  if (desperationScore > 75) return 'deadline'
  if (chaosScore < 15) return 'gentle'
  return 'standard'
}

function detectEmotion({ chaosScore, desperationScore, energyScore, special, len }: EmotionStats): string {
  if (energyScore > 80) return 'rage'
  if (desperationScore > 75) return 'dread'
  if (chaosScore > 65) return 'joy'
  if (special > 3) return 'fury'
  if (len < 5) return 'disappointment'
  return 'frustration'
}

const emotionEmojis: Record<string, string> = {
  rage: '🤬', dread: '😱', joy: '🤪', fury: '😤', disappointment: '😒', frustration: '😤'
}

function certify(type: string): { key: string, color: 'error' | 'warning' | 'success' | 'info' | 'secondary' | 'primary' } {
  const map: Record<string, { key: string, color: 'error' | 'warning' | 'success' | 'info' | 'secondary' | 'primary' }> = {
    timid: { key: 'needs', color: 'warning' },
    broken: { key: 'endangerment', color: 'error' },
    punctuation: { key: 'unbalanced', color: 'error' },
    screamer: { key: 'break', color: 'error' },
    bedlam: { key: 'chaotic', color: 'secondary' },
    haiku: { key: 'genius', color: 'success' },
    deadline: { key: 'desperate', color: 'warning' },
    gentle: { key: 'professional', color: 'info' },
    standard: { key: 'average', color: 'primary' }
  }
  return map[type] ?? { key: 'unclassifiable', color: 'primary' }
}

function generateVerdict(type: string, desperation: number): string {
  return t(`smash.verdicts.${type}_${desperation % 2}`)
}

function scoreColor(n: number): 'success' | 'warning' | 'error' {
  return n < 35 ? 'success' : n < 70 ? 'warning' : 'error'
}

const lengthLabel = computed(() => {
  const l = smash.value.length
  if (l === 0) return t('smash.length.zero')
  if (l < 5) return t('smash.length.short')
  if (l < 20) return t('smash.length.medium')
  if (l < 60) return t('smash.length.long')
  return t('smash.length.epic')
})

async function runAnalysis() {
  if (!smash.value.trim()) {
    shakeKey.value++
    return
  }
  isAnalyzing.value = true
  result.value = null
  await new Promise(r => setTimeout(r, 1200))
  result.value = analyze(smash.value)
  isAnalyzing.value = false
}

function reset() {
  smash.value = ''
  result.value = null
}

const debouncedAnalyze = useDebounceFn(runAnalysis, 800)

watch(smash, () => {
  if (props.autoAnalyze) debouncedAnalyze()
})
</script>

<template>
  <UCard class="max-w-xl mx-auto">
    <template #header>
      <div class="flex items-center gap-3">
        <UIcon
          name="i-lucide-brain-cog"
          class="size-6 text-primary-500 shrink-0"
        />
        <div>
          <p class="font-semibold text-highlighted">
            {{ t('smash.title') }}
          </p>
          <p class="text-xs text-muted">
            {{ t('smash.subtitle') }}
          </p>
        </div>
        <UBadge
          label="v0.0.1-unstable"
          color="error"
          variant="subtle"
          class="ml-auto"
        />
      </div>
    </template>

    <div class="space-y-4">
      <div>
        <label class="text-sm font-medium text-highlighted block mb-1.5">
          {{ t('smash.label') }}
        </label>
        <Motion
          :key="shakeKey"
          :animate="shakeKey > 0 ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }"
          :transition="{ duration: 0.4 }"
        >
          <UTextarea
            v-model="smash"
            :placeholder="t('smash.placeholder')"
            :maxlength="props.maxLength"
            :rows="3"
            autoresize
            class="w-full"
            @keydown.enter.prevent="runAnalysis"
          />
        </Motion>
        <p class="text-xs text-dimmed mt-1">
          {{ smash.length }} - {{ lengthLabel }}
        </p>
      </div>

      <div class="flex gap-2">
        <UButton
          class="flex-1"
          icon="i-lucide-zap"
          :loading="isAnalyzing"
          loading-icon="i-lucide-brain-circuit"
          :disabled="!smash.trim()"
          @click="runAnalysis"
        >
          {{ isAnalyzing ? t('smash.analyzing') : t('smash.submit') }}
        </UButton>
        <UButton
          v-if="result"
          icon="i-lucide-skull"
          color="neutral"
          variant="outline"
          @click="reset"
        />
      </div>

      <AnimatePresence>
        <Motion
          v-if="result"
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: -16 }"
          :transition="{ duration: 0.4, ease: 'easeOut' }"
        >
          <div class="space-y-4 pt-2 border-t border-default">
            <div class="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <p class="text-xs text-muted uppercase tracking-widest font-medium">
                  {{ t('smash.classification') }}
                </p>
                <p class="text-xl font-bold text-highlighted mt-0.5">
                  {{ t(`smash.types.${result.smashKey}`) }}
                </p>
              </div>
              <UBadge
                :label="t(`smash.certifications.${result.certKey.key}`)"
                :color="result.certKey.color"
                variant="subtle"
                size="lg"
              />
            </div>

            <div class="flex items-center gap-2 p-3 rounded-lg bg-elevated">
              <span class="text-2xl">{{ emotionEmojis[result.emotionKey] }}</span>
              <div>
                <p class="text-xs text-muted">
                  {{ t('smash.emotion') }}
                </p>
                <p class="font-semibold text-highlighted">
                  {{ t(`smash.emotions.${result.emotionKey}`) }}
                </p>
              </div>
            </div>

            <div class="space-y-2.5">
              <div
                v-for="metric in [
                  { key: 'chaos', value: result.chaosScore, icon: 'i-lucide-sparkles' },
                  { key: 'desperation', value: result.desperationScore, icon: 'i-lucide-skull' },
                  { key: 'poetry', value: result.poetryScore, icon: 'i-lucide-wand-sparkles' },
                  { key: 'energy', value: result.energyScore, icon: 'i-lucide-zap' }
                ]"
                :key="metric.key"
              >
                <div class="flex items-center justify-between text-sm mb-1">
                  <span class="flex items-center gap-1.5 text-toned">
                    <UIcon
                      :name="metric.icon"
                      class="size-3.5"
                    />
                    {{ t(`smash.metrics.${metric.key}`) }}
                  </span>
                  <span class="font-mono font-bold text-highlighted">{{ metric.value }}%</span>
                </div>
                <UProgress
                  :model-value="metric.value"
                  :color="scoreColor(metric.value)"
                  size="sm"
                />
              </div>
            </div>

            <div
              v-if="props.showStats"
              class="grid grid-cols-3 gap-2 text-center"
            >
              <div
                v-for="stat in [
                  { key: 'keys', value: result.len },
                  { key: 'unique', value: result.uniqueChars },
                  { key: 'run', value: result.consecutive }
                ]"
                :key="stat.key"
                class="p-2 rounded-lg bg-elevated"
              >
                <p class="text-lg font-bold text-highlighted font-mono">
                  {{ stat.value }}
                </p>
                <p class="text-xs text-muted">
                  {{ t(`smash.stats.${stat.key}`) }}
                </p>
              </div>
            </div>

            <UAlert
              icon="i-lucide-brain"
              color="primary"
              variant="subtle"
              :title="t('smash.verdict')"
              :description="result.verdict"
            />
          </div>
        </Motion>
      </AnimatePresence>
    </div>
  </UCard>
</template>
