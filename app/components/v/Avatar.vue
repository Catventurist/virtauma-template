<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { Motion, AnimatePresence } from 'motion-v'

const { t } = useI18n()
const localePath = useLocalePath()
const { user, isLoggedIn, isAdmin, logout } = useAuth()
const loginOpen = ref(false)

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: user.value?.username ?? 'Guest',
      type: 'label' as const,
      avatar: {
        src: user.value?.avatar,
        fallback: user.value?.username?.[0]?.toUpperCase()
      }
    }
  ],
  [
    ...(isAdmin.value
      ? [{
          label: t('auth.admin'),
          icon: 'i-lucide-shield',
          to: localePath('/')
        }]
      : []),
    {
      label: t('auth.profile'),
      icon: 'i-lucide-user',
      to: localePath('/profile')
    },
    {
      label: t('auth.settings'),
      icon: 'i-lucide-settings',
      to: localePath('/')
    }
  ],
  [
    {
      label: t('auth.logout'),
      icon: 'i-lucide-log-out',
      color: 'error' as const,
      onSelect: logout
    }
  ]
])
</script>

<template>
  <div>
    <VLoginModal v-model:open="loginOpen" />
    <AnimatePresence mode="wait">
      <Motion
        v-if="isLoggedIn"
        :key="'avatar'"
        :initial="{ opacity: 0, scale: 0.8 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0.8 }"
        :transition="{ duration: 0.15 }"
      >
        <UDropdownMenu
          :items="items"
          :content="{ align: 'end' }"
        >
          <Motion
            :while-hover="{ scale: 1.05 }"
            :while-tap="{ scale: 0.95 }"
            :transition="{ duration: 0.1 }"
          >
            <UAvatar
              :src="user?.avatar ?? '/cat.png'"
              :alt="user?.username"
              :fallback="user?.username?.[0]?.toUpperCase()"
              size="sm"
              class="cursor-pointer"
            />
          </Motion>
        </UDropdownMenu>
      </Motion>

      <Motion
        v-else
        :key="'login'"
        :initial="{ opacity: 0, x: 10 }"
        :animate="{ opacity: 1, x: 0 }"
        :exit="{ opacity: 0, x: 10 }"
        :transition="{ duration: 0.15 }"
      >
        <UButton
          :title="t('auth.login')"
          icon="i-lucide-log-in"
          color="neutral"
          variant="ghost"
          @click="loginOpen = true"
        />
      </Motion>
    </AnimatePresence>
  </div>
</template>
