<script setup lang="ts">
import { Motion } from 'motion-v'
import type { PanInfo, Transition } from 'motion-v'
import type { CSSProperties } from 'vue'

type Direction = 'up' | 'up-right' | 'right' | 'down-right' | 'down' | 'down-left' | 'left' | 'up-left'

const props = withDefaults(defineProps<{ size?: number }>(), { size: 200 })
const emit = defineEmits<{ navigate: [direction: Direction] }>()

const active = ref<Direction | null>(null)
const knobX = ref(0)
const knobY = ref(0)
const tiltX = ref(0)
const tiltY = ref(0)
const isDragging = ref(false)

const s = computed(() => ({
  outer: props.size,
  handle: Math.round(props.size * 0.775),
  button: Math.round(props.size * 0.51),
  inside: Math.round(props.size * 0.425),
  dot: Math.round(props.size * 0.04),
  zone: Math.round(props.size * 1.5),
  icon: Math.round(props.size * 0.15)
}))

const maxRadius = computed(() => Math.round(props.size * 0.12))
const ringOffset = computed(() => (s.value.zone - s.value.outer) / 2)

const knobAnimate = computed(() => ({
  x: knobX.value,
  y: knobY.value,
  rotateX: tiltY.value,
  rotateY: tiltX.value
}))

const knobTransition = computed<Transition>(() =>
  isDragging.value
    ? { duration: 0 }
    : { type: 'spring', stiffness: 400, damping: 25 }
)

const ICON_ANGLES: Record<Direction, number> = {
  'right': 0,
  'down-right': 45,
  'down': 90,
  'down-left': 135,
  'left': 180,
  'up-left': 225,
  'up': 270,
  'up-right': 315
}

const icons: Record<Direction, string> = Object.fromEntries(
  Object.keys(ICON_ANGLES).map(dir => [dir, 'i-lucide-chevron-up'])
) as Record<Direction, string>

const iconStyle = computed((): Record<Direction, CSSProperties> =>
  Object.fromEntries(
    Object.entries(ICON_ANGLES).map(([dir, deg]) => {
      const rad = (deg * Math.PI) / 180
      const rotation = (deg + 90) % 360
      return [dir, {
        position: 'absolute',
        left: `${50 + Math.cos(rad) * 62}%`,
        top: `${50 + Math.sin(rad) * 62}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`
      }]
    })
  ) as Record<Direction, CSSProperties>
)

const dotPos = [
  'top-[10%] left-1/2',
  'top-1/2 left-[90%]',
  'top-[90%] left-1/2',
  'top-1/2 left-[10%]'
]

function onPan(_e: PointerEvent, info: PanInfo) {
  isDragging.value = true
  const { x, y } = info.offset
  const mag = Math.sqrt(x * x + y * y)
  const max = maxRadius.value
  const cx = mag > max ? (x / mag) * max : x
  const cy = mag > max ? (y / mag) * max : y

  knobX.value = cx
  knobY.value = cy
  tiltX.value = (cx / max) * 12
  tiltY.value = -(cy / max) * 12

  if (mag > max * 0.3) {
    const angle = Math.atan2(y, x) * (180 / Math.PI)
    if (angle > -22.5 && angle <= 22.5) active.value = 'right'
    else if (angle > 22.5 && angle <= 67.5) active.value = 'down-right'
    else if (angle > 67.5 && angle <= 112.5) active.value = 'down'
    else if (angle > 112.5 && angle <= 157.5) active.value = 'down-left'
    else if (angle > 157.5 || angle <= -157.5) active.value = 'left'
    else if (angle > -157.5 && angle <= -112.5) active.value = 'up-left'
    else if (angle > -112.5 && angle <= -67.5) active.value = 'up'
    else active.value = 'up-right'
  } else {
    active.value = null
  }
}

function onPanEnd() {
  if (active.value) emit('navigate', active.value)
  isDragging.value = false
  active.value = null
  knobX.value = 0
  knobY.value = 0
  tiltX.value = 0
  tiltY.value = 0
}
</script>

<template>
  <div
    class="relative"
    :style="{ width: `${s.zone}px`, height: `${s.zone}px` }"
  >
    <div
      class="absolute rounded-full flex items-center justify-center bg-accented shadow-2xl/50 inset-shadow-md/50"
      :style="{
        width: `${s.outer}px`,
        height: `${s.outer}px`,
        top: `${ringOffset}px`,
        left: `${ringOffset}px`
      }"
    >
      <div
        class="rounded-full flex items-center justify-center bg-elevated shadow-xl/50 inset-shadow-sm/75"
        :style="{ width: `${s.handle}px`, height: `${s.handle}px`, perspective: `${s.outer * 1.5}px` }"
      >
        <Motion
          as="div"
          :animate="knobAnimate"
          :transition="knobTransition"
          class="rounded-full cursor-grab active:cursor-grabbing touch-none flex items-center justify-center bg-muted transform-3d shadow-lg/50 inset-shadow-xs/60"
          :style="{ width: `${s.button}px`, height: `${s.button}px` }"
          @pan="onPan"
          @pan-end="onPanEnd"
        >
          <div
            class="relative rounded-full bg-elevated inset-shadow-xs/40"
            :style="{ width: `${s.inside}px`, height: `${s.inside}px` }"
          >
            <div
              v-for="(pos, i) in dotPos"
              :key="i"
              :class="['absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted shadow-2xs/50', pos]"
              :style="{ width: `${s.dot}px`, height: `${s.dot}px` }"
            />
          </div>
        </Motion>
      </div>

      <UIcon
        v-for="(icon, dir) in icons"
        :key="dir"
        :name="icon"
        :class="[
          'transition-colors duration-200',
          active === (dir as Direction) ? 'text-primary shadow-sm shadow-primary/50' : 'text-muted'
        ]"
        :style="{
          ...iconStyle[dir as Direction],
          width: `${s.icon}px`,
          height: `${s.icon}px`
        }"
      />
    </div>
  </div>
</template>
