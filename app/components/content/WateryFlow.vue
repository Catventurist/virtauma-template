<script setup lang="ts">
import { Motion, useScroll, useTransform } from 'motion-v'

export interface FlowItem {
  id: string | number
  label: string
  description?: string
  date?: string
  icon?: string
  type?: 'event' | 'status' | 'gap'
  color?: string
}

defineOptions({ ssr: false })

const props = withDefaults(defineProps<{
  items: FlowItem[]
  variant?: 'stream' | 'trickle'
  gap?: 'sm' | 'md' | 'lg'
  animated?: boolean
}>(), {
  variant: 'stream',
  gap: 'md',
  animated: true
})

const emit = defineEmits<{ select: [item: FlowItem] }>()

const contentRef = ref<HTMLElement | null>(null)
const selectedId = ref<string | number | null>(null)

const { scrollYProgress } = useScroll({
  offset: ['start end', 'end start']
})

const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

const isTrickle = computed(() => props.variant === 'trickle')
const gapClass = computed(() => ({ sm: 'gap-8', md: 'gap-16', lg: 'gap-24' })[props.gap])
const nodeColor = (item: FlowItem) => `var(--ui-color-${item.color ?? 'primary'}-500)`
const depthOpacity = (i: number) => 1 - (i / props.items.length) * 0.25
const depthScale = (i: number) => 1 - (i / props.items.length) * 0.02
const floatDuration = (i: number) => 2.5 + (i % 3) * 0.5
const floatDelay = (i: number) => i * 0.7

function onSelect(item: FlowItem) {
  selectedId.value = selectedId.value === item.id ? null : item.id
  emit('select', item)
}
</script>

<template>
  <div
    ref="contentRef"
    class="relative overflow-hidden bg-linear-to-b from-default to-primary/5"
  >
    <div
      class="relative flex flex-col"
      :class="gapClass"
    >
      <div
        class="absolute left-1/2 -translate-x-px top-0 w-px h-full"
        :style="{ background: `linear-gradient(to bottom, transparent, var(--ui-color-primary-500), transparent)`, opacity: 0.2 }"
      />

      <Motion
        as="div"
        class="absolute left-1/2 -translate-x-px top-0 w-px origin-top"
        :style="{
          height: '100%',
          scaleY: lineScaleY,
          background: `linear-gradient(to bottom, var(--ui-color-primary-300), var(--ui-color-primary-600))`,
          boxShadow: `0 0 6px var(--ui-color-primary-400)`
        }"
      />

      <div
        v-for="(item, i) in items"
        :key="item.id"
        class="relative grid items-center gap-6"
        style="grid-template-columns: 1fr 2.5rem 1fr;"
        :style="{ opacity: depthOpacity(i) }"
      >
        <div class="flex justify-end">
          <div
            v-if="!isTrickle && i % 2 === 0"
            class="w-full overflow-hidden"
          >
            <WateryMotion :index="i">
              <UCard
                :ui="{ root: 'overflow-hidden' }"
                class="cursor-pointer relative backdrop-blur-sm bg-default/60"
                :style="{ border: `1px solid ${selectedId === item.id ? nodeColor(item) + '60' : nodeColor(item) + '20'}` }"
                @click="onSelect(item)"
              >
                <div class="relative z-10 flex items-start justify-between flex-row-reverse gap-4 text-right">
                  <div>
                    <p class="font-semibold text-highlighted">
                      {{ item.label }}
                    </p>
                    <p
                      v-if="item.description"
                      class="text-sm text-muted mt-1"
                    >
                      {{ item.description }}
                    </p>
                  </div>
                  <span
                    v-if="item.date"
                    class="text-xs text-muted whitespace-nowrap"
                  >{{ item.date }}</span>
                </div>

                <Motion
                  as="div"
                  class="absolute inset-0 pointer-events-none"
                  :style="{ background: `linear-gradient(to top, ${nodeColor(item)}25, transparent)`, transformOrigin: 'bottom' }"
                  :animate="selectedId === item.id ? { scaleY: 1, opacity: 1 } : { scaleY: 0.3, opacity: 0.4 }"
                  :transition="{ type: 'spring', stiffness: 80, damping: 20 }"
                />

                <Motion
                  as="div"
                  class="absolute inset-0 pointer-events-none opacity-10"
                  :animate="animated ? { backgroundPosition: ['0% 0%', '100% 100%'] } : {}"
                  :transition="{ duration: 6 + i, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }"
                  :style="{
                    backgroundImage: `radial-gradient(ellipse at 30% 30%, ${nodeColor(item)} 0%, transparent 60%)`,
                    backgroundSize: '200% 200%'
                  }"
                />
              </UCard>
            </WateryMotion>
          </div>
        </div>

        <div class="relative flex justify-center items-center">
          <Motion
            as="div"
            class="relative z-10 cursor-pointer w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
            :style="{
              background: `radial-gradient(circle, ${nodeColor(item)}25, ${nodeColor(item)}08)`,
              border: `1px solid ${nodeColor(item)}40`,
              boxShadow: `0 0 16px ${nodeColor(item)}30, inset 0 1px 0 rgba(255,255,255,0.1)`
            }"
            :initial="{ scale: 0, opacity: 0 }"
            :animate="{ scale: depthScale(i), opacity: 1, y: [0, -4, 0] }"
            :transition="{
              scale: { type: 'spring', stiffness: 300, damping: 20, delay: i * 0.15 },
              opacity: { duration: 0.4, delay: i * 0.15 },
              y: { duration: floatDuration(i), repeat: Infinity, ease: 'easeInOut', delay: floatDelay(i) }
            }"
            @click="onSelect(item)"
          >
            <UIcon
              v-if="item.icon"
              :name="item.icon"
              class="w-4 h-4"
              :style="{ color: nodeColor(item) }"
            />
            <span
              v-else
              class="text-xs font-semibold"
              :style="{ color: nodeColor(item) }"
            >{{ i + 1 }}</span>

            <Motion
              as="div"
              class="absolute inset-0 rounded-full pointer-events-none"
              :style="{ border: `1px solid ${nodeColor(item)}` }"
              :animate="(item.type === 'status' || selectedId === item.id) && animated
                ? { scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }
                : { scale: 1, opacity: 0 }"
              :transition="{ duration: 2, repeat: Infinity }"
            />
          </Motion>
        </div>

        <div class="flex justify-start">
          <div
            v-if="isTrickle || i % 2 !== 0"
            class="w-full overflow-hidden"
          >
            <WateryMotion :index="i">
              <UCard
                :ui="{ root: 'overflow-hidden' }"
                class="cursor-pointer relative backdrop-blur-sm bg-default/60"
                :style="{ border: `1px solid ${selectedId === item.id ? nodeColor(item) + '60' : nodeColor(item) + '20'}` }"
                @click="onSelect(item)"
              >
                <div class="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <p class="font-semibold text-highlighted">
                      {{ item.label }}
                    </p>
                    <p
                      v-if="item.description"
                      class="text-sm text-muted mt-1"
                    >
                      {{ item.description }}
                    </p>
                  </div>
                  <span
                    v-if="item.date"
                    class="text-xs text-muted whitespace-nowrap"
                  >{{ item.date }}</span>
                </div>

                <Motion
                  as="div"
                  class="absolute inset-0 pointer-events-none"
                  :style="{ background: `linear-gradient(to top, ${nodeColor(item)}25, transparent)`, transformOrigin: 'bottom' }"
                  :animate="selectedId === item.id ? { scaleY: 1, opacity: 1 } : { scaleY: 0.3, opacity: 0.4 }"
                  :transition="{ type: 'spring', stiffness: 80, damping: 20 }"
                />

                <Motion
                  as="div"
                  class="absolute inset-0 pointer-events-none opacity-10"
                  :animate="animated ? { backgroundPosition: ['0% 0%', '100% 100%'] } : {}"
                  :transition="{ duration: 6 + i, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }"
                  :style="{
                    backgroundImage: `radial-gradient(ellipse at 30% 30%, ${nodeColor(item)} 0%, transparent 60%)`,
                    backgroundSize: '200% 200%'
                  }"
                />
              </UCard>
            </WateryMotion>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
