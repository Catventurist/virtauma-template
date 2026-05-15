<script setup lang="ts">
import { Motion } from 'motion-v'

const props = withDefaults(defineProps<{
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  label?: string
  to?: string
}>(), {
  size: 'xl',
  label: undefined,
  to: '/docs/getting-started/'
})

const { t } = useI18n()
const label = computed(() => props.label ?? t('button.label'))
const loadingLabel = computed(() => t('button.loading'))
const loading = ref(false)
const burst = ref(false)

const sizes: Record<string, string> = {
  xs: 'px-2 py-1 text-xs gap-1',
  sm: 'px-2.5 py-1.5 text-xs gap-1.5',
  md: 'px-2.5 py-1.5 text-sm gap-1.5',
  lg: 'px-3 py-2 text-sm gap-2',
  xl: 'px-3 py-2 text-base gap-2'
}

const icons: Record<string, string> = {
  xs: 'size-4', sm: 'size-4', md: 'size-5', lg: 'size-5', xl: 'size-6'
}

async function onEnter() {
  if (loading.value) return
  burst.value = true
  loading.value = true
  await new Promise(r => setTimeout(r, 1500))
  loading.value = false
  burst.value = false
}
</script>

<template>
  <NuxtLinkLocale
    as-child
    :to="props.to"
  >
    <button
      class="jaa font-medium text-highlighted inline-flex items-center relative disabled:opacity-60 disabled:cursor-not-allowed"
      :class="sizes[props.size]"
      :disabled="loading"
      :style="{
        borderRadius: 'var(--ui-radius)',
        background: 'color-mix(in srgb, var(--color-vesi-400) 8%, rgba(255, 255, 255, 0.04))',
        backdropFilter: 'blur(12px) saturate(160%)',
        border: '1px solid color-mix(in srgb, var(--color-vesi-300) 35%, rgba(255, 255, 255, 0.15))',
        boxShadow: `
        inset 0 1px 0 rgba(255, 255, 255, 0.18),
        inset 0 -1px 0 rgba(0, 0, 0, 0.08),
        0 2px 12px color-mix(in srgb, var(--color-vesi-500) 12%, transparent)
      `,
        transition: 'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
      }"
      @click="onEnter"
    >
      <UIcon
        :name="loading ? 'i-lucide-loader-circle' : 'i-lucide-snowflake'"
        :class="[icons[props.size], { 'animate-spin': loading }]"
      />
      {{ loading ? loadingLabel : label }}

      <Motion
        v-if="burst"
        class="absolute pointer-events-none"
        style="inset: -6px; border-radius: inherit;"
        :initial="{ opacity: 0.8, boxShadow: '0 0 0 0px color-mix(in srgb, var(--color-vesi-300) 60%, transparent)' }"
        :animate="{ opacity: 0, boxShadow: '0 0 0 10px color-mix(in srgb, var(--color-vesi-300) 0%, transparent)' }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
        @animation-complete="burst = false"
      />
    </button>
  </NuxtLinkLocale>
</template>

<style scoped>
.jaa::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(255, 255, 255, 0.12),
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.jaa:hover {
  background: color-mix(in srgb, var(--color-vesi-300) 14%, rgba(255, 255, 255, 0.06));
  border-color: color-mix(in srgb, var(--color-vesi-300) 60%, rgba(255, 255, 255, 0.3));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    inset 0 -1px 0 rgba(0, 0, 0, 0.08),
    0 4px 20px color-mix(in srgb, var(--color-vesi-400) 25%, transparent),
    0 0 0 1px color-mix(in srgb, var(--color-vesi-300) 30%, transparent);
}

.jaa:hover::before {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .jaa,
  .jaa::before { transition: none; }
}
</style>
