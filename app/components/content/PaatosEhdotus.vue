<script setup lang="ts">
import { Motion } from 'motion-v'
import {
  PaatosRegisterVoice,
  PaatosCurrentBranch
} from '~/composables/usePaatos'

const props = withDefaults(defineProps<{
  author?: string
  role?: string
  weight?: number
  type?: string
  branchId?: string
}>(), {
  author: 'Cat',
  role: 'Muukalainen',
  weight: 1,
  type: 'support'
})

const registerVoice = inject(PaatosRegisterVoice)
const currentBranch = inject(PaatosCurrentBranch, 'root')

onMounted(() => {
  registerVoice?.({
    author: props.author,
    role: props.role,
    weight: props.weight,
    type: props.type,
    branchId: props.branchId ?? currentBranch
  })
})

const { t } = useI18n()

const typeColor: Record<string, string> = {
  support: 'text-success',
  concern: 'text-warning',
  amendment: 'text-info'
}
</script>

<template>
  <Motion
    :initial="{ opacity: 0, x: -4 }"
    :animate="{ opacity: 1, x: 0 }"
    :transition="{ duration: 0.3 }"
    class="px-5 py-3"
  >
    <div class="flex items-center gap-2 mb-2">
      <span :class="['text-xs font-medium', typeColor[type] ?? 'text-default']">
        {{ t(`paatos.${type}`, type) }}
      </span>
      <span class="text-xs text-highlighted font-medium">{{ author }}</span>
      <span class="text-xs text-muted">{{ role }}</span>
      <span class="text-xs text-muted ml-auto">{{ weight }}</span>
    </div>
    <div class="text-sm text-default leading-relaxed">
      <slot />
    </div>
  </Motion>
</template>
