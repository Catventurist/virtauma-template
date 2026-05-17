<script setup lang="ts">
import { Motion } from 'motion-v'
import { z } from 'zod/v4'
import type { FormSubmitEvent } from '@nuxt/ui'

const { t } = useI18n()
const localePath = useLocalePath()
const { login } = useAuth()

const schema = z.object({
  email: z.email(t('login.validation.email')),
  password: z.string().min(1, t('login.validation.password'))
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref<string | null>(null)

const submit = async (event: FormSubmitEvent<Schema>) => {
  loading.value = true
  error.value = null
  try {
    await login(event.data.email, event.data.password)
    await navigateTo(localePath('/'))
  } catch {
    error.value = t('login.error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
    <Motion
      v-for="i in 5"
      :key="i"
      as="div"
      :animate="{ scale: [1, 3.5], opacity: [0.06, 0] }"
      :transition="{
        duration: 6 + i * 1.5,
        delay: i * 1.2,
        repeat: Infinity,
        ease: 'easeOut'
      }"
      class="absolute size-32 rounded-full border border-primary pointer-events-none"
    />

    <Motion
      as="div"
      :initial="{ opacity: 0, y: 32 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 1, ease: 'easeOut' }"
      class="flex flex-col items-center gap-8 w-full max-w-sm px-4 relative z-10"
    >
      <Motion
        as="div"
        :animate="{ y: [0, -6, 0] }"
        :transition="{ duration: 5, repeat: Infinity, ease: 'easeInOut' }"
      >
        <UIcon
          name="i-lucide-waves"
          class="size-10 text-primary"
        />
      </Motion>

      <div class="flex flex-col items-center gap-2 text-center">
        <h1 class="text-2xl font-semibold text-highlighted">
          {{ t('login.title') }}
        </h1>
        <p class="text-sm text-toned">
          {{ t('login.description') }}
        </p>
      </div>

      <UForm
        :schema="schema"
        :state="state"
        class="flex flex-col gap-4 w-full"
        @submit="submit"
      >
        <UFormField
          name="email"
          :label="t('login.email')"
        >
          <UInput
            v-model="state.email"
            name="email"
            type="email"
            :placeholder="t('login.email')"
            size="lg"
            autocomplete="email"
            autofocus
            class="w-full"
          />
        </UFormField>

        <UFormField
          name="password"
          :label="t('login.password')"
        >
          <UInput
            v-model="state.password"
            name="password"
            type="password"
            :placeholder="t('login.password')"
            size="lg"
            autocomplete="current-password"
            class="w-full"
          />
        </UFormField>

        <Motion
          v-if="error"
          as="p"
          :initial="{ opacity: 0, y: 4 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.3 }"
          class="text-sm text-error text-center"
        >
          {{ error }}
        </Motion>

        <UButton
          type="submit"
          :label="t('login.enter')"
          color="primary"
          variant="subtle"
          size="lg"
          block
          :loading="loading"
          leading-icon="i-lucide-droplet"
        />
      </UForm>

      <div class="flex flex-col items-center gap-2">
        <UButton
          :label="t('login.forgot')"
          color="neutral"
          variant="ghost"
          size="sm"
          :to="localePath('/')"
        />
        <USeparator
          color="neutral"
          class="w-32"
        />
        <UButton
          :label="t('login.register')"
          color="neutral"
          variant="ghost"
          size="sm"
          :to="localePath('/')"
        />
      </div>
    </Motion>
  </div>
</template>
