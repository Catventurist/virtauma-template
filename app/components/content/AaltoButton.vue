<script setup lang="ts">
import { Motion } from 'motion-v'

const props = withDefaults(defineProps<{
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  label?: string
  to?: string
  icon?: string
}>(), {
  size: 'xl',
  label: 'Aalto',
  to: '/about',
  icon: 'i-lucide-wave'
})

const { t } = useI18n()
const label = computed(() => props.label ?? t('button.label'))
const loadingLabel = computed(() => t('button.loading'))

const loading = ref(false)
const ripple = ref(false)

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
  ripple.value = true
  loading.value = true
  await new Promise(r => setTimeout(r, 1500))
  loading.value = false
  ripple.value = false
}
</script>

<template>
  <NuxtLinkLocale
    as-child
    :to="props.to"
  >
    <button
      class="aalto font-medium text-white inline-flex items-center relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
      :class="sizes[props.size]"
      :disabled="loading"
      @click="onEnter"
    >
      <UIcon
        :name="loading ? 'i-lucide-loader-circle' : icon"
        :class="[icons[props.size], { 'animate-spin': loading }]"
      />
      {{ loading ? loadingLabel : label }}

      <Motion
        v-if="ripple"
        class="absolute inset-0 pointer-events-none"
        style="border-radius: inherit"
        :initial="{ boxShadow: 'inset 0 0 0 0px rgba(255,255,255,0.4)' }"
        :animate="{ boxShadow: 'inset 0 0 0 60px rgba(255,255,255,0)' }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
        @animation-complete="ripple = false"
      />
    </button>
  </NuxtLinkLocale>
</template>

<style scoped>
.aalto {
  border-radius: var(--ui-radius);
  background:
    linear-gradient(
      105deg,
      var(--color-vesi-700) 0%,
      var(--color-vesi-500) 45%,
      var(--color-cyan-500) 100%
    );
  background-size: 200% 100%;
  background-position: 0% 0%;
  box-shadow:
    0 2px 12px color-mix(in srgb, var(--color-vesi-600) 50%, transparent),
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    inset 0 -1px 0 rgba(0, 0, 0, 0.15);
  transition:
    background-position 0.8s ease,
    box-shadow 0.3s ease;
}

.aalto::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 20%,
    rgba(255, 255, 255, 0.08) 50%,
    transparent 80%
  );
  background-size: 200% 100%;
  background-position: 200% 0%;
  border-radius: inherit;
  transition: background-position 0s;
}

.aalto:hover {
  background-position: 100% 0%;
  box-shadow:
    0 4px 24px color-mix(in srgb, var(--color-vesi-500) 60%, transparent),
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2);
}

.aalto:hover::after {
  background-position: -200% 0%;
  transition: background-position 0.6s ease;
}

@media (prefers-reduced-motion: reduce) {
  .aalto,
  .aalto::after { transition: none; }
}
</style>
