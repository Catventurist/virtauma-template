<script setup lang="ts">
import { z } from 'zod/v4'
import { Motion } from 'motion-v'

const { t } = useI18n()
const { login } = useAuth()

const open = defineModel<boolean>('open', { default: false })

const schema = z.object({
  email: z.email(t('auth.validation.email')),
  password: z.string().min(8, t('auth.validation.password'))
})

type Schema = z.infer<typeof schema>

const state = reactive<Schema>({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

async function onSubmit() {
  loading.value = true
  error.value = ''
  try {
    await login(state.email, state.password)
    open.value = false
  } catch {
    error.value = t('auth.validation.invalid')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UModal v-model:open="open">
    <template #content>
      <div class="relative overflow-hidden">
        <Motion
          :initial="{ opacity: 0, y: -20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.4 }"
          class="relative z-10 p-6"
        >
          <div class="flex flex-col items-center gap-2 mb-6">
            <Motion
              :initial="{ scale: 0 }"
              :animate="{ scale: 1 }"
              :transition="{ type: 'spring', stiffness: 200, delay: 0.1 }"
            >
              <UIcon
                name="i-lucide-droplets"
                class="size-10 text-primary"
              />
            </Motion>
            <h2 class="text-xl font-semibold text-highlighted">
              {{ t('auth.welcome') }}
            </h2>
            <p class="text-sm text-muted">
              {{ t('auth.subtitle') }}
            </p>
          </div>

          <UForm
            :schema="schema"
            :state="state"
            class="flex flex-col gap-4"
            @submit="onSubmit"
          >
            <UFormField
              :label="t('auth.email')"
              name="email"
            >
              <UInput
                id="email"
                v-model="state.email"
                type="email"
                :placeholder="t('auth.emailPlaceholder')"
                icon="i-lucide-mail"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="t('auth.password')"
              name="password"
            >
              <UInput
                id="password"
                v-model="state.password"
                type="password"
                :placeholder="t('auth.passwordPlaceholder')"
                icon="i-lucide-lock"
                class="w-full"
              />
            </UFormField>

            <Motion
              v-if="error"
              :initial="{ opacity: 0, x: -10 }"
              :animate="{ opacity: 1, x: 0 }"
            >
              <UAlert
                color="error"
                variant="subtle"
                :title="error"
                icon="i-lucide-alert-circle"
              />
            </Motion>

            <UButton
              type="submit"
              :label="t('auth.login')"
              :loading="loading"
              color="primary"
              class="w-full justify-center mt-2"
            />
          </UForm>
        </Motion>

        <Motion
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :transition="{ duration: 1 }"
          class="absolute inset-0 pointer-events-none"
        >
          <div class="absolute -bottom-8 -left-8 size-40 rounded-full bg-primary/5 blur-2xl" />
          <div class="absolute -top-8 -right-8 size-32 rounded-full bg-info/5 blur-2xl" />
        </Motion>
      </div>
    </template>
  </UModal>
</template>
