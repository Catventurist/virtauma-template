<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'

const { locale, t } = useI18n()
const toast = useToast()

const wallet = reactive({
  address: '0xf1nn1sh4v3s1b4s3d',
  status: 'online' as 'online' | 'offline' | 'syncing',
  tokens: [
    {
      id: 'hourly',
      name: 'HÖYRY',
      amount: 38.5,
      icon: 'i-lucide-wind',
      color: 'text-orange-300',
      temp: 100
    },
    {
      id: 'sula',
      name: 'SULA',
      amount: 4820.5,
      icon: 'i-lucide-droplets',
      color: 'text-sky-400',
      temp: 20
    },
    {
      id: 'virta',
      name: 'VIRTA',
      amount: 91.75,
      icon: 'i-lucide-waves-arrow-down',
      color: 'text-cyan-400',
      temp: 10
    },
    {
      id: 'jaa',
      name: 'JÄÄ',
      amount: 1200.0,
      icon: 'i-lucide-snowflake',
      color: 'text-blue-300',
      temp: -10
    },
    {
      id: 'huurre',
      name: 'HUURRE',
      amount: 44.25,
      icon: 'i-lucide-sparkles',
      color: 'text-indigo-300',
      temp: -30
    }
  ],
  transactions: [
    { id: 1, type: 'received', token: 'SULA', amount: 120.0, time: '2min ago', status: 'confirmed' },
    { id: 2, type: 'frozen', token: 'JÄÄ', amount: 200.0, time: '1hr ago', status: 'confirmed' },
    { id: 3, type: 'earned', token: 'VIRTA', amount: 12.5, time: '3hr ago', status: 'confirmed' },
    { id: 4, type: 'sent', token: 'SULA', amount: 80.0, time: 'yesterday', status: 'confirmed' },
    { id: 5, type: 'melted', token: 'SULA', amount: 50.0, time: 'yesterday', status: 'pending' }
  ]
})

const phaseModal = ref(false)
const phaseAction = ref<'freeze' | 'melt'>('freeze')
const phaseAmount = ref<number | null>(null)

function openFreeze() {
  phaseAction.value = 'freeze'
  phaseAmount.value = null
  phaseModal.value = true
}

function openMelt() {
  phaseAction.value = 'melt'
  phaseAmount.value = null
  phaseModal.value = true
}

function confirmPhase() {
  if (!phaseAmount.value || phaseAmount.value <= 0) return

  if (phaseAction.value === 'freeze') {
    const sula = wallet.tokens.find(t => t.id === 'sula')!
    const jaa = wallet.tokens.find(t => t.id === 'jaa')!
    sula.amount -= phaseAmount.value
    jaa.amount += phaseAmount.value
    wallet.transactions.unshift({
      id: Date.now(), type: 'frozen', token: 'JÄÄ',
      amount: phaseAmount.value, time: 'just now', status: 'confirmed'
    })
    toast.add({ title: t('wallet.freeze.success'), icon: 'i-lucide-snowflake', color: 'info', duration: 2000 })
  } else {
    const sula = wallet.tokens.find(t => t.id === 'sula')!
    const jaa = wallet.tokens.find(t => t.id === 'jaa')!
    jaa.amount -= phaseAmount.value
    sula.amount += phaseAmount.value
    wallet.transactions.unshift({
      id: Date.now(), type: 'melted', token: 'SULA',
      amount: phaseAmount.value, time: 'just now', status: 'confirmed'
    })
    toast.add({ title: t('wallet.melt.success'), icon: 'i-lucide-droplets', color: 'info', duration: 2000 })
  }

  phaseModal.value = false
}

const total = computed(() => wallet.tokens.reduce((sum, t) => sum + t.amount, 0))

const avgTemp = computed(() => {
  const weighted = wallet.tokens.reduce((sum, t) => sum + t.temp * t.amount, 0)
  return weighted / total.value
})

const phaseBarPosition = computed(() => {
  const min = -30, max = 100
  return Math.min(100, Math.max(0, ((avgTemp.value - min) / (max - min)) * 100))
})

const expandedToken = ref<string | null>(null)

const statusColor = computed(() => ({
  online: 'success' as const,
  offline: 'error' as const,
  syncing: 'warning' as const
})[wallet.status])

function truncate(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

async function copyAddress() {
  await navigator.clipboard.writeText(wallet.address)
  toast.add({
    title: t('wallet.address_copied'),
    description: wallet.address,
    icon: 'i-lucide-copy-check',
    color: 'info',
    duration: 2000
  })
}

function txColor(type: string) {
  if (['received', 'earned', 'melted'].includes(type)) return 'text-emerald-400'
  if (type === 'frozen') return 'text-blue-300'
  return 'text-rose-400'
}

function txSign(type: string) {
  return type === 'sent' || type === 'frozen' ? '−' : '+'
}
</script>

<template>
  <div class="relative w-full max-w-sm lg:max-w-3xl mx-auto">
    <Motion
      :animate="{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }"
      :transition="{ duration: 12, repeat: Infinity, ease: 'linear' }"
      class="absolute inset-0 rounded-2xl blur-2xl opacity-40 -z-10"
      style="background: linear-gradient(135deg, #003d8e, #0099cc, #004BAC, #00c8ff, #003070); background-size: 300% 300%;"
    />

    <div class="rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 dark:bg-black/20 overflow-hidden shadow-2xl">
      <div class="flex flex-col lg:flex-row lg:divide-x divide-white/10">
        <div class="flex flex-col lg:w-64 shrink-0">
          <div class="p-5 flex items-center justify-between">
            <div
              class="flex items-center gap-2 cursor-pointer"
              @click="copyAddress"
            >
              <span class="font-mono text-sm text-highlighted hover:text-primary transition-colors">
                {{ truncate(wallet.address) }}
              </span>
              <UIcon
                name="i-lucide-copy"
                class="size-3.5 text-muted"
              />
            </div>
            <UBadge
              :label="t(`wallet.status.${wallet.status}`)"
              :color="statusColor"
              variant="subtle"
              size="sm"
            />
          </div>

          <div class="px-5 pb-4">
            <p class="text-xs text-muted mb-1">
              {{ t('wallet.total_balance') }}
            </p>
            <Motion
              :initial="{ opacity: 0, y: 8 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.5 }"
            >
              <span class="text-4xl font-semibold text-highlighted tracking-tight">
                {{ total.toLocaleString(locale, { minimumFractionDigits: 2 }) }}
              </span>
            </Motion>
          </div>

          <div class="px-5 pb-5">
            <div class="flex justify-between text-xs text-muted mb-1.5">
              <span>−30°</span>
              <span>{{ t('wallet.phase_bar') }}</span>
              <span>100°</span>
            </div>
            <div
              class="relative h-2 rounded-full overflow-hidden"
              style="background: linear-gradient(to right, #818cf8, #60a5fa, #38bdf8, #fb923c, #f97316)"
            >
              <Motion
                :animate="{ left: `${phaseBarPosition}%` }"
                :transition="{ type: 'spring', stiffness: 60, damping: 20 }"
                class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-3.5 rounded-full bg-white shadow-md border-2 border-white/80"
              />
            </div>
            <p class="text-xs text-muted text-center mt-1.5">
              {{ avgTemp.toFixed(1) }}°
            </p>
          </div>

          <USeparator class="lg:hidden" />

          <div class="p-4 mt-auto grid grid-cols-2 gap-2">
            <UButton
              :label="t('wallet.actions.send')"
              icon="i-lucide-arrow-up-right"
              variant="subtle"
              color="primary"
              block
            />
            <UButton
              :label="t('wallet.actions.receive')"
              icon="i-lucide-arrow-down-left"
              variant="subtle"
              color="primary"
              block
            />
            <UButton
              :label="t('wallet.actions.freeze')"
              icon="i-lucide-snowflake"
              variant="subtle"
              color="info"
              block
              @click="openFreeze"
            />
            <UButton
              :label="t('wallet.actions.melt')"
              icon="i-lucide-droplets"
              variant="subtle"
              color="info"
              block
              @click="openMelt"
            />
          </div>
        </div>

        <div class="flex flex-col flex-1 min-w-0">
          <USeparator class="lg:hidden" />

          <div class="p-3 flex flex-col gap-1">
            <Motion
              v-for="(token, i) in wallet.tokens"
              :key="token.id"
              :initial="{ opacity: 0, x: -12 }"
              :animate="{ opacity: 1, x: 0 }"
              :transition="{ delay: i * 0.08, duration: 0.4 }"
            >
              <Motion
                :while-hover="{ scale: 1.01 }"
                :while-tap="{ scale: 0.99 }"
                :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
                class="rounded-xl p-3 cursor-pointer hover:bg-white/5 transition-colors"
                @click="expandedToken = expandedToken === token.id ? null : token.id"
              >
                <div class="flex items-center gap-3">
                  <div class="size-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <UIcon
                      :name="token.icon"
                      :class="['size-4', token.color]"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-highlighted">{{ token.name }}</span>
                      <span class="text-sm font-mono text-highlighted">
                        {{ token.amount.toLocaleString(locale, { minimumFractionDigits: 2 }) }}
                      </span>
                    </div>
                    <UProgress
                      :model-value="(token.amount / total) * 100"
                      size="xs"
                      color="primary"
                      class="opacity-60"
                    />
                  </div>
                </div>

                <AnimatePresence>
                  <Motion
                    v-if="expandedToken === token.id"
                    :initial="{ opacity: 0, height: 0 }"
                    :animate="{ opacity: 1, height: 'auto' }"
                    :exit="{ opacity: 0, height: 0 }"
                    :transition="{ duration: 0.25 }"
                    class="overflow-hidden"
                  >
                    <div class="mt-3 pt-3 border-t border-white/10 flex justify-between text-xs text-muted">
                      <span>{{ t(`wallet.tokens.${token.id}.label`) }}</span>
                      <span>{{ token.temp }}° · {{ ((token.amount / total) * 100).toFixed(1) }}%</span>
                    </div>
                  </Motion>
                </AnimatePresence>
              </Motion>
            </Motion>
          </div>

          <USeparator />

          <div class="p-3 flex flex-col gap-0.5">
            <p class="text-xs text-muted px-2 pb-2">
              {{ t('wallet.recent_activity') }}
            </p>
            <AnimatePresence>
              <Motion
                v-for="(tx, i) in wallet.transactions.slice(0, 5)"
                :key="tx.id"
                :initial="{ opacity: 0, x: 12 }"
                :animate="{ opacity: 1, x: 0 }"
                :exit="{ opacity: 0, x: -12 }"
                :transition="{ delay: i * 0.06, duration: 0.3 }"
                :while-hover="{ x: 3 }"
                class="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-white/5 transition-colors cursor-default"
              >
                <div class="flex items-center gap-2.5">
                  <UIcon
                    :name="tx.type === 'sent' ? 'i-lucide-arrow-up-right' : tx.type === 'frozen' ? 'i-lucide-snowflake' : tx.type === 'melted' ? 'i-lucide-droplets' : 'i-lucide-arrow-down-left'"
                    :class="['size-4', txColor(tx.type)]"
                  />
                  <div>
                    <p class="text-xs text-highlighted capitalize">
                      {{ t(`wallet.transactions.${tx.type}`) }} {{ tx.token }}
                    </p>
                    <p class="text-xs text-muted">
                      {{ tx.time }}
                    </p>
                  </div>
                </div>
                <div class="text-right">
                  <p :class="['text-xs font-mono font-medium', txColor(tx.type)]">
                    {{ txSign(tx.type) }}{{ tx.amount.toLocaleString(locale, { minimumFractionDigits: 2 }) }}
                  </p>
                  <UBadge
                    :label="t(`wallet.transactions.${tx.status}`)"
                    :color="tx.status === 'pending' ? 'warning' : 'success'"
                    variant="subtle"
                    size="sm"
                  />
                </div>
              </Motion>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>

    <UModal v-model:open="phaseModal">
      <template #content>
        <div class="p-6 flex flex-col gap-4">
          <p class="text-sm font-medium text-highlighted">
            {{ t(`wallet.${phaseAction}.title`) }}
          </p>
          <UInputNumber
            v-model="phaseAmount"
            :placeholder="t(`wallet.${phaseAction}.amount`)"
            :min="0"
            :max="phaseAction === 'freeze' ? wallet.tokens.find(t => t.id === 'sula')?.amount : wallet.tokens.find(t => t.id === 'jaa')?.amount"
          />
          <div class="flex gap-2 justify-end">
            <UButton
              :label="t(`wallet.${phaseAction}.cancel`)"
              variant="ghost"
              @click="phaseModal = false"
            />
            <UButton
              :label="t(`wallet.${phaseAction}.confirm`)"
              :icon="phaseAction === 'freeze' ? 'i-lucide-snowflake' : 'i-lucide-droplets'"
              color="info"
              @click="confirmPhase"
            />
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
