<script setup lang="ts">
import { Motion } from 'motion-v'

const props = defineProps<{
  output: string
  mode: 'mdc' | 'json'
}>()

const { t } = useI18n()
const emit = defineEmits<{ 'update:mode': ['mdc' | 'json'] }>()

const copied = ref(false)

async function copy() {
  await navigator.clipboard.writeText(props.output)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

function download() {
  const blob = new Blob([props.output], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `content.${props.mode === 'mdc' ? 'md' : 'json'}`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div
    class="border-t border-default bg-default/40 backdrop-blur-sm flex flex-col"
    style="height: 200px"
  >
    <div class="flex items-center gap-2 px-3 py-2 border-b border-default">
      <UTabs
        :items="[{ label: 'MDC', value: 'mdc' }, { label: 'JSON', value: 'json' }]"
        :model-value="mode"
        size="xs"
        variant="link"
        @update:model-value="emit('update:mode', $event as 'mdc' | 'json')"
      />

      <div class="ml-auto flex gap-1">
        <UButton
          :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
          size="xs"
          color="neutral"
          variant="ghost"
          :label="copied ? t('builder.output.copied') : t('builder.output.copy')"
          @click="copy"
        />
        <UButton
          icon="i-lucide-download"
          :label="t('builder.output.download')"
          size="xs"
          color="neutral"
          variant="ghost"
          @click="download"
        />
      </div>
    </div>

    <div class="flex-1 overflow-auto p-3">
      <Motion
        :key="mode"
        as="pre"
        :initial="{ opacity: 0, y: 4 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
        class="text-xs text-muted font-mono whitespace-pre-wrap"
      >
        {{ output || t('builder.output.empty') }}
      </Motion>
    </div>
  </div>
</template>
