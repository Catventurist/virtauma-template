<script setup lang="ts">
import { Motion } from 'motion-v'

defineProps<{
  userId: string
}>()

const { isAdmin, isMember } = useAuth()
const { t } = useI18n()

const showAdmin = ref(false)
</script>

<template>
  <Motion
    as="div"
    :initial="{ opacity: 0, y: 16 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8, ease: 'easeOut' }"
    class="flex flex-col gap-6"
  >
    <div class="flex items-center justify-between">
      <span class="text-xs text-muted uppercase tracking-widest">{{ t('tila.title') }}</span>
      <UButton
        v-if="isAdmin"
        :icon="showAdmin ? 'i-lucide-x' : 'i-lucide-settings'"
        :tooltip="showAdmin ? t('tila.close_admin') : t('tila.open_admin')"
        color="neutral"
        variant="ghost"
        size="xs"
        square
        @click="showAdmin = !showAdmin"
      />
    </div>

    <Motion
      v-if="showAdmin && isAdmin"
      as="div"
      :initial="{ opacity: 0, y: 6 }"
      :animate="{ opacity: 1, y: 0 }"
      :exit="{ opacity: 0, y: 6 }"
      :transition="{ duration: 0.4, ease: 'easeOut' }"
    >
      <TilaControl :user-id="userId" />
    </Motion>

    <TilaSignal
      v-else-if="isMember"
      :user-id="userId"
    />

    <TilaIndicator v-else />
  </Motion>
</template>
