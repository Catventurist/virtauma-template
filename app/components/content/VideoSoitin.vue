<script setup lang="ts">
import { Motion } from 'motion-v'
import { useIntersectionObserver } from '@vueuse/core'

const props = withDefaults(defineProps<{
  src?: string
  poster?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  ratio?: string
  youtube?: string
  title?: string
  eager?: boolean
  preload?: 'none' | 'metadata' | 'auto'
  preview?: boolean
}>(), {
  autoplay: false,
  loop: false,
  muted: false,
  controls: true,
  ratio: '16/9',
  eager: false,
  preload: 'none',
  preview: false
})

const { t } = useI18n()

const videoRef = ref<HTMLVideoElement>()
const placeholderRef = ref<HTMLDivElement>()
const lazySrc = ref<string>()
const visible = ref(false)
const activated = ref(false)
const error = ref(false)

const youtubeThumbnail = computed(() => {
  if (!props.youtube) return null
  const id = props.youtube.match(/(?:youtu\.be\/|v=)([^&?/]+)/)?.[1] ?? props.youtube
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
})

const youtubeSrc = computed(() => {
  if (!props.youtube) return null
  const id = props.youtube.match(/(?:youtu\.be\/|v=)([^&?/]+)/)?.[1] ?? props.youtube
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    autoplay: '1',
    ...(props.controls === false && { controls: '0' }),
    ...(props.loop && { loop: '1', playlist: id })
  })
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`
})

const observerTarget = computed(() => props.youtube && !activated.value ? placeholderRef.value : videoRef.value)

const { stop } = useIntersectionObserver(observerTarget, (entries) => {
  if (entries[0]?.isIntersecting) {
    visible.value = true
    if (props.src) lazySrc.value = props.src
    stop()
  }
})

onMounted(() => {
  if (props.eager) {
    visible.value = true
    if (props.src) lazySrc.value = props.src
  }
})

function pause() {
  if (videoRef.value instanceof HTMLVideoElement) {
    videoRef.value.pause()
  }
  activated.value = false
}

defineExpose({ pause })
</script>

<template>
  <Motion
    :initial="{ opacity: 0, y: 20 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.5 }"
    :viewport="{ once: true }"
    :style="{ aspectRatio: ratio }"
    class="relative w-full overflow-hidden rounded-lg"
  >
    <template v-if="youtube">
      <iframe
        v-if="activated"
        :src="youtubeSrc!"
        :title="title"
        class="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
      <div
        v-else
        ref="placeholderRef"
        class="relative size-full cursor-pointer group"
        :aria-label="title ?? t('video.play')"
        role="button"
        @click="activated = true"
      >
        <NuxtImg
          :src="poster ?? youtubeThumbnail ?? undefined"
          :alt="title ?? t('video.play')"
          class="size-full object-cover"
        />
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="size-16 rounded-full bg-default/70 flex items-center justify-center group-hover:error/20 transition-colors duration-200">
            <UIcon
              name="i-lucide-play"
              class="size-7 translate-x-0.5"
            />
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div
        v-if="error"
        class="size-full flex items-center justify-center text-muted"
      >
        <UIcon
          name="i-lucide-video-off"
          class="size-8 mr-2"
        />
        <span>{{ t('video.error') }}</span>
      </div>
      <video
        v-else
        ref="videoRef"
        :src="lazySrc"
        :poster="poster"
        :autoplay="autoplay"
        :loop="loop"
        :muted="muted"
        :controls="controls"
        :preload="preload"
        class="size-full object-cover"
        playsinline
        @error="error = true"
      />
    </template>
    <template v-if="preview">
      <NuxtImg
        :src="poster ?? youtubeThumbnail ?? undefined"
        :alt="title"
        class="size-full object-cover"
      />
    </template>
  </Motion>
</template>
