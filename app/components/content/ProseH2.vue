<script setup lang="ts">
const props = defineProps<{ id: string }>()

const cleanId = computed(() => {
  const decoded = decodeURIComponent(props.id)
  if (import.meta.server) return decoded
  return CSS.escape(decoded)
})
</script>

<template>
  <h2
    :id="cleanId"
    class="relative text-2xl font-bold mt-12 mb-6 scroll-mt-[calc(48px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(48px+var(--ui-header-height))]"
  >
    <a
      :href="`#${cleanId}`"
      class="group lg:ps-2 lg:-ms-2 no-underline"
    >
      <span class="absolute -ms-8 top-1 opacity-0 group-hover:opacity-100 group-focus:opacity-100 p-1 bg-elevated hover:text-primary rounded-md hidden lg:flex text-muted transition">
        <UIcon
          name="i-lucide-hash"
          class="size-4 shrink-0"
        />
      </span>
      <span class="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
        <slot />
      </span>
    </a>
  </h2>
</template>
