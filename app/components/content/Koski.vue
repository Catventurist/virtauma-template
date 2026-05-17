<script setup lang="ts">
import { Motion } from 'motion-v'
import { useLocalStorage } from '@vueuse/core'

interface KoskiEntry {
  id: string
  text: string
  castedAt: string
}

const { t } = useI18n()

const withMeta = computed(() =>
  visible.value.map(e => ({
    ...e,
    headline: e.text.length < 60
      ? e.text
      : e.text.slice(0, e.text.lastIndexOf(' ', 60)) || e.text.slice(0, 60),
    body: e.text.length >= 60
      ? e.text.slice(e.text.lastIndexOf(' ', 60)).trim()
      : '',
    ago: formatAgo(e.castedAt)
  }))
)

const MAX_LENGTH = 280

const placeholders = [
  t('koski.placeholders.0'),
  t('koski.placeholders.1'),
  t('koski.placeholders.2'),
  t('koski.placeholders.3')
]

const placeholderIndex = ref(0)
const placeholder = computed(() => placeholders[placeholderIndex.value % placeholders.length])

onMounted(() => {
  placeholderIndex.value = Math.floor(Math.random() * placeholders.length)
})

const entries = useLocalStorage<KoskiEntry[]>('koski:entries', [])

const visible = computed(() =>
  entries.value
    .filter(e => Date.now() - new Date(e.castedAt).getTime() < 86400000)
    .sort((a, b) => new Date(b.castedAt).getTime() - new Date(a.castedAt).getTime())
)

const formatAgo = (date: string) => {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  if (mins < 1) return t('koski.ago.now')
  if (mins < 60) return t('koski.ago.minutes', { n: mins })
  if (hours < 24) return t('koski.ago.hours', { n: hours })
  return t('koski.ago.yesterday')
}

const firstExpiry = computed(() => {
  if (!import.meta.client) return null
  const oldest = visible.value[visible.value.length - 1]
  if (!oldest) return null
  const expiresAt = new Date(oldest.castedAt).getTime() + 86400000
  const diff = expiresAt - Date.now()
  const hours = Math.floor(diff / 3600000)
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return t('koski.ago.now')
  if (mins < 60) return t('koski.expires.minutes', { n: mins })
  return t('koski.expires.hours', { n: hours })
})

const input = ref('')
const remaining = computed(() => MAX_LENGTH - input.value.length)

const cast = () => {
  if (!input.value.trim() || input.value.length > MAX_LENGTH) return
  entries.value.push({
    id: crypto.randomUUID(),
    text: input.value.trim(),
    castedAt: new Date().toISOString()
  })
  input.value = ''
  placeholderIndex.value++
}

const remove = (id: string) => {
  entries.value = entries.value.filter(e => e.id !== id)
}
</script>

<template>
  <Motion
    as="div"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{ duration: 1, ease: 'easeOut' }"
    class="flex flex-col gap-6"
  >
    <form
      class="flex flex-col gap-2"
      @submit.prevent="cast"
    >
      <div class="flex gap-2 items-start">
        <UTextarea
          id="koski"
          v-model="input"
          name="koski"
          :placeholder="placeholder"
          :maxlength="MAX_LENGTH"
          autoresize
          size="lg"
          class="flex-1"
          @keydown.enter.exact.prevent="cast"
          @keydown.escape="input = ''"
        />
        <UButton
          type="submit"
          color="primary"
          variant="subtle"
          icon="i-lucide-waves"
          size="lg"
          :disabled="!input.trim() || remaining < 0"
          square
        />
      </div>
      <div class="flex justify-between items-center px-1">
        <span class="text-xs text-muted">
          {{ visible.length }} {{ t('koski.today') }}
          <template v-if="firstExpiry">
            · {{ t('koski.dissolves') }} {{ firstExpiry }}
          </template>
        </span>
        <span
          class="text-xs transition-colors"
          :class="remaining < 20 ? 'text-error' : 'text-muted'"
        >
          {{ remaining }}
        </span>
      </div>
    </form>

    <USeparator color="neutral">
      <span class="text-xs text-muted uppercase tracking-widest px-2">
        {{ t('koski.current') }}
      </span>
    </USeparator>

    <div
      v-if="withMeta.length"
      class="columns-1 md:columns-2 lg:columns-3 gap-4"
    >
      <Motion
        v-for="(entry, i) in withMeta"
        :key="entry.id"
        as="article"
        :initial="{ opacity: 0, y: 8 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: i * 0.04, duration: 0.5, ease: 'easeOut' }"
        class="group break-inside-avoid mb-4 p-5 cursor-default flex flex-col gap-2 rounded-2xl backdrop-blur-sm bg-primary/5 hover:bg-primary/10 border border-primary/10 hover:border-primary/20 transition-all duration-500"
      >
        <h2
          class="font-semibold text-highlighted leading-snug"
          :class="entry.text.length < 60 ? 'text-lg' : entry.text.length < 120 ? 'text-base' : 'text-sm'"
        >
          {{ entry.headline }}
        </h2>

        <p
          v-if="entry.body"
          class="text-sm text-toned leading-relaxed"
        >
          {{ entry.body }}
        </p>

        <div class="flex items-center justify-between mt-1">
          <span class="text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity">
            {{ entry.ago }}
          </span>
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            size="xs"
            square
            class="opacity-0 group-hover:opacity-100 transition-opacity"
            @click="remove(entry.id)"
          />
        </div>
      </Motion>
    </div>

    <Motion
      v-else
      as="div"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ delay: 0.3, duration: 0.6 }"
      class="flex flex-col items-center gap-3 py-16 text-center"
    >
      <UIcon
        name="i-lucide-waves"
        class="size-8 text-muted animate-sink"
      />
      <p class="text-sm text-muted">
        {{ t('koski.empty') }}
      </p>
    </Motion>
  </Motion>
</template>

<style scoped>
@keyframes sink {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(5px); }
}
.animate-sink { animation: sink 4s ease-in-out infinite; }
</style>
