<script setup lang="ts">
import { Motion } from 'motion-v'

const { t, locale } = useI18n()

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  date?: Date
  orderNumber?: string
  items?: { label: string, qty?: number, value: number }[]
  tax?: number
  tip?: number
  footer?: string
  paid?: boolean
  currency?: string
}>(), {
  title: undefined,
  items: () => [],
  paid: false,
  currency: 'EUR'
})

const fmt = (value: number) => new Intl.NumberFormat(locale.value, {
  style: 'currency',
  currency: props.currency
}).format(value)

const fmtDate = (date: Date) => new Intl.DateTimeFormat(locale.value, {
  dateStyle: 'medium',
  timeStyle: 'short'
}).format(date)

const subtotal = computed(() => props.items.reduce((sum, i) => sum + i.value * (i.qty ?? 1), 0))
const total = computed(() => subtotal.value + (props.tax ?? 0) + (props.tip ?? 0))

const receipt = useTemplateRef<HTMLDivElement>('receipt')

const print = () => {
  const el = receipt.value
  if (!el) return
  const html = `<!DOCTYPE html><html><head>${document.head.innerHTML}</head><body>${el.outerHTML}</body></html>`
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }))
  const win = window.open(url)
  win?.addEventListener('load', () => {
    win.print()
    URL.revokeObjectURL(url)
  })
}

defineExpose({ print })
</script>

<template>
  <div class="flex justify-center py-10">
    <div ref="receipt">
      <Motion
        as="div"
        class="relative w-full max-w-sm px-6 py-8 font-mono bg-elevated shadow-xl shadow-primary
               before:absolute before:inset-x-0 before:-top-3 before:h-3
               before:bg-linear-[-45deg] before:from-transparent before:from-50% before:to-elevated before:to-50%
               after:absolute after:inset-x-0 after:-bottom-3 after:h-3 after:rotate-180
               after:bg-linear-[-45deg] after:from-transparent after:from-50% after:to-elevated after:to-50%"
        :initial="{ opacity: 0, y: 48, rotate: -1 }"
        :animate="{ opacity: 1, y: 0, rotate: 0 }"
        :transition="{ duration: 0.5, ease: 'easeOut' }"
      >
        <div class="mb-5 text-center">
          <div class="text-lg font-bold uppercase tracking-widest text-highlighted">
            {{ title ?? t('receipt.title') }}
          </div>
          <div
            v-if="subtitle"
            class="mt-1 text-xs text-muted"
          >
            {{ subtitle }}
          </div>
          <div
            v-if="date || orderNumber"
            class="mt-2 text-xs text-dimmed"
          >
            <span v-if="date">{{ fmtDate(date) }}</span>
            <span v-if="date && orderNumber"> · </span>
            <span v-if="orderNumber">#{{ orderNumber }}</span>
          </div>
        </div>

        <div class="my-4 border-t border-dashed border-accented" />

        <table class="w-full table-fixed">
          <tr
            v-for="(item, i) in items"
            :key="item.label"
          >
            <Motion
              as="td"
              class="text-sm text-muted py-0.5 w-8 pr-2"
              :initial="{ opacity: 0, x: -10 }"
              :animate="{ opacity: 1, x: 0 }"
              :transition="{ delay: 0.1 * i, duration: 0.3 }"
            >
              {{ item.qty ?? 1 }}×
            </Motion>
            <Motion
              as="td"
              class="text-sm text-default py-0.5 truncate"
              :initial="{ opacity: 0, x: -10 }"
              :animate="{ opacity: 1, x: 0 }"
              :transition="{ delay: 0.1 * i + 0.05, duration: 0.3 }"
            >
              {{ item.label }}
            </Motion>
            <Motion
              as="td"
              class="text-sm text-default py-0.5 text-right whitespace-nowrap w-24"
              :initial="{ opacity: 0, x: -10 }"
              :animate="{ opacity: 1, x: 0 }"
              :transition="{ delay: 0.1 * i + 0.1, duration: 0.3 }"
            >
              {{ fmt(item.value * (item.qty ?? 1)) }}
            </Motion>
          </tr>
        </table>

        <div class="my-4 border-t border-dashed border-accented" />

        <div
          v-if="tax"
          class="flex justify-between text-xs text-muted"
        >
          <span>{{ t('receipt.tax') }}</span><span>{{ fmt(tax) }}</span>
        </div>
        <div
          v-if="tip"
          class="flex justify-between text-xs text-muted mt-1"
        >
          <span>{{ t('receipt.tip') }}</span><span>{{ fmt(tip) }}</span>
        </div>

        <div class="my-4 border-t border-dashed border-accented" />

        <Motion
          as="div"
          class="flex justify-between text-xl font-bold text-highlighted"
          :initial="{ scale: 0.85, opacity: 0 }"
          :animate="{ scale: 1, opacity: 1 }"
          :transition="{ delay: 0.35, duration: 0.4 }"
        >
          <span>{{ t('receipt.total') }}</span><span>{{ fmt(total) }}</span>
        </Motion>

        <div class="my-6 h-10 bg-default opacity-80" />

        <div
          v-if="footer"
          class="text-center text-xs text-dimmed"
        >
          {{ footer }}
        </div>

        <Motion
          v-if="paid"
          as="div"
          class="absolute inset-0 flex items-center justify-center"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :transition="{ delay: 0.8 }"
        >
          <Motion
            as="div"
            class="border-4 border-success px-4 py-2 text-success text-xl font-bold uppercase tracking-widest backdrop-blur-md bg-elevated/30"
            :initial="{ opacity: 0, scale: 2, rotate: -30 }"
            :animate="{ opacity: 1, scale: 1, rotate: -15 }"
            :transition="{ delay: 0.8, duration: 0.4, ease: 'easeOut' }"
          >
            {{ t('receipt.paid') }}
          </Motion>
        </Motion>
      </Motion>
    </div>
  </div>
</template>

<!--
const receipt = useTemplateRef('receipt')
<Kuitti
        ref="receipt"
        :items="[
          { label: 'Mustikkapiirakka', qty: 1, value: 4.50 },
          { label: 'Kahvi', qty: 2, value: 3.00 },
          { label: 'Sima', qty: 1, value: 3.00 }
        ]"
        subtitle="Table 7"
        :date="new Date()"
        order-number="0042"
        :tax="1.35"
        :tip="2.00"
        footer="Kiitos!"
        :paid="true"
      />
      <UButton @click="receipt?.print()">
        Print
      </UButton>
 -->
