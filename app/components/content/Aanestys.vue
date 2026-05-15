<script setup lang="ts">
import { Motion } from 'motion-v'

const props = withDefaults(defineProps<{
  pollId: string
  question: string
  options?: { id: string, label: string, votes?: number }[]
}>(), {
  options: () => []
})

const emit = defineEmits<{
  vote: [{ optionId: string, signature: string, publicKey: JsonWebKey, pollId: string, timestamp: number }]
}>()

const { t } = useI18n()

const state = ref<'idle' | 'signing' | 'voted'>('idle')
const selectedId = ref<string | null>(null)
const signature = ref<string>('')

const localVotes = ref<Record<string, number>>(
  Object.fromEntries(props.options.map(o => [o.id, o.votes ?? 0]))
)

const total = computed(() => Object.values(localVotes.value).reduce((a, b) => a + b, 0))

async function castVote(optionId: string) {
  if (state.value !== 'idle') return
  state.value = 'signing'
  selectedId.value = optionId

  try {
    const keypair = await crypto.subtle.generateKey(
      { name: 'ECDSA', namedCurve: 'P-256' },
      true,
      ['sign', 'verify']
    )

    const payload = new TextEncoder().encode(
      JSON.stringify({ optionId, pollId: props.pollId, timestamp: Date.now() })
    )

    const sig = await crypto.subtle.sign(
      { name: 'ECDSA', hash: { name: 'SHA-256' } },
      keypair.privateKey,
      payload
    )

    const publicKey = await crypto.subtle.exportKey('jwk', keypair.publicKey)
    signature.value = Array.from(new Uint8Array(sig))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    localVotes.value[optionId] = (localVotes.value[optionId] ?? 0) + 1
    state.value = 'voted'

    emit('vote', {
      optionId,
      signature: signature.value,
      publicKey,
      pollId: props.pollId,
      timestamp: Date.now()
    })
  } catch {
    state.value = 'idle'
  }
}

const truncatedSig = computed(() =>
  signature.value ? `${signature.value.slice(0, 12)}…${signature.value.slice(-12)}` : ''
)
</script>

<template>
  <div class="rounded-sm p-6 bg-elevated border border-accented shadow-lg space-y-6">
    <p class="text-lg font-semibold text-highlighted">
      {{ question }}
    </p>

    <div
      v-if="state !== 'voted'"
      class="flex flex-col gap-3"
    >
      <Motion
        v-for="option in options"
        :key="option.id"
        :while-hover="state === 'idle' ? { x: 6 } : undefined"
        :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
      >
        <button
          class="group relative w-full text-left px-4 py-3 rounded-sm overflow-hidden
            bg-muted border border-accented
            hover:border-primary
            text-sm text-highlighted font-medium
            transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="state === 'signing'"
          @click="castVote(option.id)"
        >
          <div class="absolute inset-0 bg-primary/10 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out pointer-events-none" />

          <span class="relative z-10 flex items-center justify-between">
            {{ option.label }}
            <Motion
              v-if="state === 'signing' && selectedId === option.id"
              class="size-4 rounded-full border-2 border-primary/40 border-t-transparent"
              :animate="{ rotate: 360 }"
              :transition="{ duration: 0.7, repeat: Infinity, ease: 'linear' }"
            />
            <UIcon
              v-else
              name="i-lucide-droplets"
              class="size-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
          </span>
        </button>
      </Motion>

      <p
        v-if="state === 'signing'"
        class="text-xs text-muted flex items-center gap-2"
      >
        <UIcon
          name="i-lucide-lock-keyhole"
          class="size-3"
        />
        {{ t('vote.signing') }}
      </p>
    </div>

    <Motion
      v-else
      class="flex flex-col mt-4 gap-4"
      :initial="{ opacity: 0, y: 8 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }"
    >
      <Motion
        v-for="(option, i) in options"
        :key="option.id"
        :initial="{ opacity: 0, x: -12 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }"
        class="space-y-1.5"
      >
        <div class="flex justify-between text-sm">
          <span
            class="font-medium flex items-center gap-1.5"
            :class="option.id === selectedId ? 'text-primary' : 'text-muted'"
          >
            {{ option.label }}
            <Motion
              v-if="option.id === selectedId"
              :initial="{ scale: 0 }"
              :animate="{ scale: 1 }"
              :transition="{ type: 'spring', stiffness: 500, damping: 20, delay: i * 0.08 + 0.2 }"
            >
              <UIcon
                name="i-lucide-check"
                class="size-3.5 text-primary"
              />
            </Motion>
          </span>
          <Motion
            tag="span"
            class="text-muted tabular-nums"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :transition="{ duration: 0.3, delay: i * 0.08 + 0.3 }"
          >
            {{ total > 0 ? Math.round(((localVotes[option.id] ?? 0) / total) * 100) : 0 }}%
          </Motion>
        </div>

        <div class="h-1.5 rounded-full bg-accented overflow-hidden">
          <Motion
            class="h-full rounded-full"
            :class="option.id === selectedId
              ? 'bg-linear-to-r from-vesi-600 via-vesi-400 to-cyan-400'
              : 'bg-primary/20'"
            :initial="{ width: '0%' }"
            :animate="{ width: `${total > 0 ? ((localVotes[option.id] ?? 0) / total) * 100 : 0}%` }"
            :transition="{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 + 0.1 }"
          />
        </div>
      </Motion>

      <Motion
        class="border-t border-primary/20 rounded-md flex items-center gap-2 text-xs text-muted"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 0.4, delay: options.length * 0.08 + 0.3 }"
      >
        <UIcon
          name="i-lucide-lock-keyhole"
          class="size-3 shrink-0 text-primary mt-2"
        />
        <span class="font-mono truncate mt-2">{{ truncatedSig }}</span>
      </Motion>
    </Motion>
  </div>
</template>
