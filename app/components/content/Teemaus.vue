<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'

const appConfig = useAppConfig()
const { applyRadius, applyFont } = useThemeDOM()

const primaryColors = [
  'red', 'orange', 'amber', 'yellow', 'lime', 'green',
  'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo',
  'violet', 'purple', 'fuchsia', 'pink', 'rose'
]

const neutralOptions = ['slate', 'zinc', 'stone', 'mauve', 'mist', 'olive', 'taupe']

const fontOptions: Record<string, string> = {
  finlandica: 'Finlandica',
  inter: 'Inter',
  outfit: 'Outfit',
  fraunces: 'Fraunces',
  spaceGrotesk: 'Space Grotesk'
}

const radiusValues = [0, 0.125, 0.25, 0.375, 0.5]

const DEFAULT_PRIMARY = 'green'
const DEFAULT_NEUTRAL = 'slate'
const DEFAULT_RADIUS_INDEX = 2
const DEFAULT_FONT_KEY = 'finlandica'
const DEFAULT_FONT_NAME = 'Finlandica'

const visible = ref(false)
const radiusIndex = ref(DEFAULT_RADIUS_INDEX)
const activeFont = ref(DEFAULT_FONT_KEY)

async function onOpenChange(val: boolean) {
  if (val) {
    await nextTick()
    visible.value = true
  } else {
    visible.value = false
  }
}

function setPrimary(color: string) {
  appConfig.ui.colors.primary = color
}

function setNeutral(neutral: string) {
  appConfig.ui.colors.neutral = neutral
}

function setRadius(val: number | undefined) {
  if (val === undefined) return
  radiusIndex.value = val
  applyRadius(radiusValues[val] ?? 0)
}

function setFont(key: string, name: string) {
  activeFont.value = key
  applyFont(name)
}

function reset() {
  appConfig.ui.colors.primary = DEFAULT_PRIMARY
  appConfig.ui.colors.neutral = DEFAULT_NEUTRAL
  setRadius(DEFAULT_RADIUS_INDEX)
  setFont(DEFAULT_FONT_KEY, DEFAULT_FONT_NAME)
}
</script>

<template>
  <USlideover
    side="right"
    :overlay="false"
    :modal="false"
    :ui="{
      content: 'backdrop-blur-2xl bg-default/70 ring ring-primary/20',
      header: 'border-b border-primary/15'
    }"
    @update:open="onOpenChange"
  >
    <UButton
      icon="i-lucide-sparkles"
      color="neutral"
      variant="subtle"
      :label="$t('themeSettings.trigger')"
      :aria-label="$t('themeSettings.title')"
      aria-haspopup="dialog"
    />

    <template #header>
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-droplets"
            class="size-4 text-primary"
          />
          <span class="text-highlighted font-semibold">
            {{ $t('themeSettings.title') }}
          </span>
        </div>
        <ColorModeButton size="sm" />
      </div>
    </template>

    <template #body>
      <UScrollArea class="h-full">
        <div class="flex flex-col gap-6 p-1">
          <AnimatePresence>
            <Motion
              v-if="visible"
              :initial="{ opacity: 0, y: 20, scale: 0.97 }"
              :animate="{ opacity: 1, y: 0, scale: 1 }"
              :exit="{ opacity: 0, y: 8, scale: 0.98 }"
              :transition="{ type: 'spring', stiffness: 280, damping: 24, delay: 0 }"
            >
              <p class="text-xs font-medium text-toned uppercase tracking-widest mb-3">
                {{ $t('themeSettings.primaryColor') }}
              </p>
              <div class="flex flex-wrap gap-2">
                <Motion
                  v-for="color in primaryColors"
                  :key="color"
                  :while-hover="{ scale: 1.05 }"
                  :while-tap="{ scale: 0.95 }"
                  :transition="{ duration: 0.12 }"
                >
                  <UButton
                    :variant="appConfig.ui.colors.primary === color ? 'outline' : 'ghost'"
                    color="primary"
                    size="sm"
                    @click="setPrimary(color)"
                  >
                    <span class="flex items-center gap-1.5">
                      <span
                        class="size-2.5 rounded-full shrink-0"
                        :style="{ backgroundColor: `var(--color-${color}-500)` }"
                      />
                      {{ $t(`themeSettings.colors.${color}`) }}
                    </span>
                  </UButton>
                </Motion>
              </div>
            </Motion>
          </AnimatePresence>

          <USeparator />

          <AnimatePresence>
            <Motion
              v-if="visible"
              :initial="{ opacity: 0, y: 20, scale: 0.97 }"
              :animate="{ opacity: 1, y: 0, scale: 1 }"
              :exit="{ opacity: 0, y: 8, scale: 0.98 }"
              :transition="{ type: 'spring', stiffness: 280, damping: 24, delay: 0.06 }"
            >
              <p class="text-xs font-medium text-toned uppercase tracking-widest mb-3">
                {{ $t('themeSettings.neutral') }}
              </p>
              <div class="flex flex-wrap gap-2">
                <Motion
                  v-for="neutral in neutralOptions"
                  :key="neutral"
                  :while-hover="{ scale: 1.05 }"
                  :while-tap="{ scale: 0.95 }"
                  :transition="{ duration: 0.12 }"
                >
                  <UButton
                    :label="$t(`themeSettings.neutrals.${neutral}`)"
                    :variant="appConfig.ui.colors.neutral === neutral ? 'soft' : 'ghost'"
                    color="primary"
                    size="sm"
                    @click="setNeutral(neutral)"
                  />
                </Motion>
              </div>
            </Motion>
          </AnimatePresence>

          <USeparator />

          <AnimatePresence>
            <Motion
              v-if="visible"
              :initial="{ opacity: 0, y: 20, scale: 0.97 }"
              :animate="{ opacity: 1, y: 0, scale: 1 }"
              :exit="{ opacity: 0, y: 8, scale: 0.98 }"
              :transition="{ type: 'spring', stiffness: 280, damping: 24, delay: 0.12 }"
            >
              <div class="flex items-center justify-between mb-3">
                <p class="text-xs font-medium text-toned uppercase tracking-widest">
                  {{ $t('themeSettings.radius') }}
                </p>
                <span class="text-xs text-muted">{{ radiusValues[radiusIndex] }}rem</span>
              </div>
              <USlider
                :model-value="radiusIndex"
                :min="0"
                :max="4"
                :step="1"
                color="primary"
                @update:model-value="setRadius"
              />
            </Motion>
          </AnimatePresence>

          <USeparator />

          <AnimatePresence>
            <Motion
              v-if="visible"
              :initial="{ opacity: 0, y: 20, scale: 0.97 }"
              :animate="{ opacity: 1, y: 0, scale: 1 }"
              :exit="{ opacity: 0, y: 8, scale: 0.98 }"
              :transition="{ type: 'spring', stiffness: 280, damping: 24, delay: 0.18 }"
            >
              <p class="text-xs font-medium text-toned uppercase tracking-widest mb-3">
                {{ $t('themeSettings.font') }}
              </p>
              <div class="flex flex-wrap gap-2">
                <Motion
                  v-for="(name, key) in fontOptions"
                  :key="key"
                  :while-hover="{ scale: 1.05 }"
                  :while-tap="{ scale: 0.95 }"
                  :transition="{ duration: 0.12 }"
                >
                  <UButton
                    :label="name"
                    :style="{ fontFamily: name }"
                    :variant="activeFont === key ? 'soft' : 'ghost'"
                    color="primary"
                    size="sm"
                    @click="setFont(key, name)"
                  />
                </Motion>
              </div>
            </Motion>
          </AnimatePresence>
        </div>
      </UScrollArea>
    </template>

    <template #footer>
      <div class="flex justify-end w-full">
        <UButton
          icon="i-lucide-rotate-ccw"
          color="neutral"
          variant="ghost"
          size="sm"
          :label="$t('themeSettings.reset')"
          @click="reset"
        />
      </div>
    </template>
  </USlideover>
</template>
