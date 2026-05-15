<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'

definePageMeta({ middleware: 'auth' })

const { t } = useI18n()
const localePath = useLocalePath()
const { user, logout } = useAuth()

const editing = ref(false)
const username = ref(user.value?.username ?? '')

const title = t('profile.title')
const description = t('profile.description')

useSeoMeta({
  title: title,
  description: description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description
})
</script>

<template>
  <div class="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
    <Motion
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 1.2 }"
      class="absolute inset-0 pointer-events-none"
    >
      <div class="absolute top-[-10%] left-[-10%] size-160 rounded-full bg-primary/10 blur-3xl" />
      <div class="absolute bottom-[-10%] right-[-10%] size-140 rounded-full bg-info/10 blur-3xl" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-80 rounded-full bg-primary/5 blur-2xl" />
    </Motion>

    <div class="relative z-10 w-full max-w-md flex flex-col gap-4">
      <Motion
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5 }"
      >
        <UCard
          variant="subtle"
          class="overflow-hidden group"
        >
          <div class="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-info/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div class="flex flex-col items-center gap-4 py-6 relative">
            <Motion
              :initial="{ scale: 0, rotate: -10 }"
              :animate="{ scale: 1, rotate: 0 }"
              :while-hover="{ scale: 1.05, rotate: 3 }"
              :transition="{ type: 'spring', stiffness: 200, delay: 0.2 }"
              class="cursor-pointer"
            >
              <div class="relative w-12 h-12 mb-3">
                <UAvatar
                  :src="user?.avatar ?? '/cat.png'"
                  :alt="user?.username"
                  size="3xl"
                  class="ring-2 ring-primary/20 ring-offset-2 transition-shadow duration-300 hover:ring-primary/50 hover:shadow-lg hover:shadow-primary/20"
                />
                <div class="absolute -bottom-1 -right-1 z-10 backdrop-blur-sm rounded-full p-1">
                  <UIcon
                    name="i-lucide-droplets"
                    class="size-3 text-info"
                  />
                </div>
              </div>
            </Motion>

            <AnimatePresence mode="wait">
              <Motion
                v-if="!editing"
                :key="'view'"
                :initial="{ opacity: 0, y: 5 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: -5 }"
                class="flex flex-col items-center gap-1"
              >
                <h2 class="text-xl font-semibold text-highlighted">
                  {{ user?.username }}
                </h2>
                <p class="text-sm text-muted">
                  {{ user?.email }}
                </p>
                <UBadge
                  :label="user?.role"
                  :color="user?.role === 'admin' ? 'primary' : 'neutral'"
                  variant="soft"
                  size="sm"
                  class="mt-1"
                />
              </Motion>

              <Motion
                v-else
                :key="'edit'"
                :initial="{ opacity: 0, y: 5 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: -5 }"
                class="w-full px-4"
              >
                <UInput
                  v-model="username"
                  :placeholder="t('profile.usernamePlaceholder')"
                  icon="i-lucide-user-pen"
                  class="w-full"
                />
              </Motion>
            </AnimatePresence>
          </div>
        </UCard>
      </Motion>

      <Motion
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 0.15 }"
      >
        <UCard variant="subtle">
          <div class="flex flex-col gap-1">
            <Motion
              :while-hover="{ x: 4 }"
              :transition="{ duration: 0.15 }"
            >
              <UButton
                :label="editing ? t('profile.save') : t('profile.edit')"
                :icon="editing ? 'i-lucide-check' : 'i-lucide-user-pen'"
                color="primary"
                variant="ghost"
                class="w-full justify-start"
                @click="editing = !editing"
              />
            </Motion>

            <Motion
              :while-hover="{ x: 4 }"
              :transition="{ duration: 0.15 }"
            >
              <UButton
                :label="t('auth.settings')"
                icon="i-lucide-settings"
                color="neutral"
                variant="ghost"
                class="w-full justify-start"
                :to="localePath('/settings')"
              />
            </Motion>

            <USeparator class="my-1" />

            <Motion
              :while-hover="{ x: 4 }"
              :transition="{ duration: 0.15 }"
            >
              <UButton
                :label="t('auth.logout')"
                icon="i-lucide-log-out"
                color="error"
                variant="ghost"
                class="w-full justify-start"
                @click="logout"
              />
            </Motion>
          </div>
        </UCard>
      </Motion>
    </div>
  </div>
</template>
