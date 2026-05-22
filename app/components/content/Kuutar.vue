<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'
import { onClickOutside, onKeyStroke } from '@vueuse/core'

const { t } = useI18n()
const { chakras, active, activeKey, todayKey, setKuutar, resetToToday } = useKuutar()

const isOpen = ref(false)
const pos = ref({ x: 0, y: 0 })
const panelRef = ref<HTMLElement | null>(null)

function toggle(e: MouseEvent) {
  const panelH = 420
  const panelW = 288
  const rawY = window.innerHeight - e.clientY > panelH
    ? e.clientY + 12
    : e.clientY - panelH - 12

  pos.value = {
    x: Math.max(16, Math.min(e.clientX, window.innerWidth - panelW - 16)),
    y: Math.max(16, Math.min(rawY, window.innerHeight - panelH - 16))
  }
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

onClickOutside(panelRef, close)

onKeyStroke('Escape', close)
</script>

<template>
  <div class="flex flex-col items-center gap-6 py-8">
    <div class="flex items-center gap-1">
      <UButton
        v-for="c in chakras"
        :key="c.key"
        :icon="c.icon"
        size="sm"
        :color="activeKey === c.key ? 'primary' : 'neutral'"
        :variant="activeKey === c.key ? 'subtle' : 'outline'"
        square
        @click="setKuutar(c.key)"
      />
    </div>

    <AnimatePresence mode="wait">
      <Motion
        :key="active.key"
        as="button"
        class="flex flex-col items-center gap-2 focus:outline-none"
        :initial="{ opacity: 0, scale: 0.92, y: 8 }"
        :animate="{ opacity: 1, scale: 1, y: 0 }"
        :exit="{ opacity: 0, scale: 0.92, y: -8 }"
        :transition="{ duration: 0.3, ease: 'easeInOut' }"
        @click="toggle"
      >
        <UIcon
          :name="active.icon"
          class="size-16 text-primary"
        />
        <p class="text-lg font-semibold text-highlighted">
          {{ t(`chakra.${active.key}.name`) }}
        </p>
        <p class="text-sm text-muted italic">
          {{ t(`chakra.${active.key}.element`) }}
        </p>
      </Motion>
    </AnimatePresence>

    <Teleport to="body">
      <AnimatePresence>
        <Motion
          v-if="isOpen"
          ref="panelRef"
          as="div"
          class="fixed z-50 w-72 p-4 space-y-3 rounded-lg shadow-lg shadow-secondary ring ring-primary/50 backdrop-blur-sm bg-default/90"
          :style="{ left: `${pos.x}px`, top: `${pos.y}px` }"
          :initial="{ opacity: 0, scale: 0.95, y: -8 }"
          :animate="{ opacity: 1, scale: 1, y: 0 }"
          :exit="{ opacity: 0, scale: 0.95, y: -8 }"
          :transition="{ duration: 0.2, ease: 'easeOut' }"
        >
          <div class="flex items-center justify-between gap-3">
            <UIcon
              :name="active.icon"
              class="size-5 text-primary shrink-0"
            />
            <div>
              <p class="text-sm font-semibold text-highlighted">
                {{ t(`chakra.${active.key}.name`) }}
              </p>
              <p class="text-xs text-muted italic">
                {{ t(`chakra.${active.key}.sanskrit`) }}
              </p>
            </div>
            <UButton
              size="xs"
              color="neutral"
              variant="ghost"
              icon="i-lucide-x"
              square
              @click="close"
            />
          </div>

          <USeparator />

          <div class="space-y-2">
            <div>
              <p class="text-xs text-muted uppercase tracking-widest mb-1">
                {{ t('chakra.element') }}
              </p>
              <p class="text-sm text-toned">
                {{ t(`chakra.${active.key}.element`) }}
              </p>
            </div>
            <div>
              <p class="text-xs text-muted uppercase tracking-widest mb-1">
                {{ t('chakra.affirmation') }}
              </p>
              <p class="text-sm text-toned italic">
                {{ t(`chakra.${active.key}.affirmation`) }}
              </p>
            </div>
            <p class="text-sm text-toned leading-relaxed">
              {{ t(`chakra.${active.key}.description`) }}
            </p>
          </div>

          <div class="pt-1 border-t border-default">
            <p class="text-xs font-semibold text-highlighted">
              {{ t(`chakra.${active.key}.character.name`) }}
              <span class="font-normal text-muted italic ml-1">{{ t(`chakra.${active.key}.character.title`) }}</span>
            </p>
            <p class="text-xs text-toned leading-relaxed mt-1">
              {{ t(`chakra.${active.key}.character.description`) }}
            </p>
          </div>

          <div class="flex items-center justify-between pt-1 border-t border-default">
            <span class="text-xs text-muted">{{ t('chakra.today') }}: {{ t(`chakra.${todayKey}.name`) }}</span>
            <UButton
              v-if="activeKey !== todayKey"
              size="xs"
              color="primary"
              variant="ghost"
              trailing-icon="i-lucide-rotate-ccw"
              @click="resetToToday()"
            >
              {{ t('chakra.reset') }}
            </UButton>
          </div>
        </Motion>
      </AnimatePresence>

      <Transition name="fade">
        <div
          v-if="isOpen"
          class="fixed inset-0 z-40"
          @click="close"
        />
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
