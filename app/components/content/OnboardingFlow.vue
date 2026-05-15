<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'
import {
  useOnboarding,
  welcomeSchema,
  identitySchema,
  freezeSchema,
  communitySchema
} from '~/composables/useOnboarding'

const {
  step,
  steps,
  welcome,
  identity,
  freeze,
  community,
  initialSula,
  mockCommunities,
  next,
  prev,
  generateAddress,
  result
} = useOnboarding()

const { t } = useI18n()
const toast = useToast()

const stepperItems = computed(() =>
  steps.value.map((s, i) => ({
    ...s,
    disabled: i > step.value
  }))
)

const sulaLanded = ref(false)

const onWelcomeSubmit = next
const onIdentitySubmit = next
const onFreezeSubmit = next

async function onSulaStep() {
  sulaLanded.value = false
  await nextTick()
  setTimeout(() => {
    sulaLanded.value = true
  }, 300)
  next()
}

async function onCommunitySubmit() {
  if (!community.communityId) return
  toast.add({
    title: t('onboarding.community_joined'),
    icon: 'i-lucide-users',
    color: 'success',
    duration: 2000
  })
  next()
}

const selectedCommunity = computed(() =>
  mockCommunities.find(c => c.id === community.communityId)
)

onMounted(() => {
  generateAddress()
})
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
    <Motion
      :animate="{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }"
      :transition="{ duration: 12, repeat: Infinity, ease: 'linear' }"
      class="absolute inset-0 -z-10 rounded-2xl"
      style="background: linear-gradient(135deg, #001734, #003d8e, #001734, #002352); background-size: 300% 300%;"
    />

    <div class="w-full max-w-lg">
      <UStepper
        v-model="step"
        :items="stepperItems"
        disabled
        color="primary"
        class="mb-8"
      />

      <div class="rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 dark:bg-black/30 overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          <Motion
            v-if="step === 0"
            key="welcome"
            :initial="{ opacity: 0, x: 40 }"
            :animate="{ opacity: 1, x: 0 }"
            :exit="{ opacity: 0, x: -40 }"
            :transition="{ duration: 0.3 }"
            class="p-8 flex flex-col gap-6"
          >
            <div class="text-center">
              <Motion
                :initial="{ scale: 0.8, opacity: 0 }"
                :animate="{ scale: 1, opacity: 1 }"
                :transition="{ delay: 0.1, type: 'spring', stiffness: 200 }"
              >
                <UIcon
                  name="i-lucide-droplets"
                  class="size-12 text-primary mx-auto mb-4"
                />
              </Motion>
              <h1 class="text-2xl font-semibold text-highlighted">
                Tervetuloa
              </h1>
              <p class="text-sm text-muted mt-2">
                {{ t('onboarding.welcome_desc') }}
              </p>
            </div>

            <UForm
              :schema="welcomeSchema"
              :state="welcome"
              @submit="onWelcomeSubmit"
            >
              <UFormField
                :label="t('onboarding.choose_language')"
                name="locale"
              >
                <USelect
                  id="locale"
                  v-model="welcome.locale"
                  :items="[{ label: 'Suomi', value: 'fi' }, { label: 'English', value: 'en' }]"
                  class="w-full"
                />
              </UFormField>
              <UButton
                type="submit"
                color="primary"
                block
                class="mt-6"
                :label="t('onboarding.continue')"
                trailing-icon="i-lucide-arrow-right"
              />
            </UForm>
          </Motion>

          <Motion
            v-else-if="step === 1"
            key="identity"
            :initial="{ opacity: 0, x: 40 }"
            :animate="{ opacity: 1, x: 0 }"
            :exit="{ opacity: 0, x: -40 }"
            :transition="{ duration: 0.3 }"
            class="p-8 flex flex-col gap-6"
          >
            <div>
              <h2 class="text-xl font-semibold text-highlighted">
                {{ t('onboarding.identity_title') }}
              </h2>
              <p class="text-sm text-muted mt-1">
                {{ t('onboarding.identity_desc') }}
              </p>
            </div>

            <UForm
              :schema="identitySchema"
              :state="identity"
              @submit="onIdentitySubmit"
            >
              <div class="flex flex-col gap-4">
                <UFormField
                  :label="t('onboarding.name')"
                  name="name"
                >
                  <UInput
                    id="name"
                    v-model="identity.name"
                    :placeholder="t('onboarding.name_placeholder')"
                    class="w-full"
                  />
                </UFormField>

                <UFormField
                  :label="t('onboarding.address')"
                  name="address"
                >
                  <div class="flex gap-2">
                    <UInput
                      id="address"
                      v-model="identity.address"
                      :placeholder="t('onboarding.address_placeholder')"
                      class="flex-1"
                      font-mono
                    />
                    <UButton
                      :label="t('onboarding.generate')"
                      variant="subtle"
                      color="primary"
                      @click="generateAddress"
                    />
                  </div>
                </UFormField>
              </div>

              <div class="flex gap-2 mt-6">
                <UButton
                  :label="t('onboarding.back')"
                  variant="ghost"
                  @click="prev"
                />
                <UButton
                  type="submit"
                  color="primary"
                  block
                  :label="t('onboarding.continue')"
                  trailing-icon="i-lucide-arrow-right"
                />
              </div>
            </UForm>
          </Motion>

          <Motion
            v-else-if="step === 2"
            key="sula"
            :initial="{ opacity: 0, x: 40 }"
            :animate="{ opacity: 1, x: 0 }"
            :exit="{ opacity: 0, x: -40 }"
            :transition="{ duration: 0.3 }"
            class="p-8 flex flex-col gap-6 items-center text-center"
          >
            <h2 class="text-xl font-semibold text-highlighted">
              {{ t('onboarding.sula_title') }}
            </h2>
            <p class="text-sm text-muted">
              {{ t('onboarding.sula_desc') }}
            </p>

            <Motion
              :initial="{ y: -60, opacity: 0, scale: 1.5 }"
              :animate="{ y: 0, opacity: 1, scale: 1 }"
              :transition="{ delay: 0.2, type: 'spring', stiffness: 120, damping: 14 }"
            >
              <div class="size-24 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <UIcon
                  name="i-lucide-droplets"
                  class="size-10 text-primary"
                />
              </div>
            </Motion>

            <Motion
              :initial="{ opacity: 0, scale: 0.8 }"
              :animate="{ opacity: 1, scale: 1 }"
              :transition="{ delay: 0.5 }"
            >
              <span class="text-5xl font-semibold text-highlighted">+{{ initialSula }}</span>
              <p class="text-sm text-muted mt-1">
                SULA
              </p>
            </Motion>

            <UButton
              color="primary"
              block
              :label="t('onboarding.continue')"
              trailing-icon="i-lucide-arrow-right"
              class="w-full"
              @click="onSulaStep"
            />
          </Motion>

          <Motion
            v-else-if="step === 3"
            key="freeze"
            :initial="{ opacity: 0, x: 40 }"
            :animate="{ opacity: 1, x: 0 }"
            :exit="{ opacity: 0, x: -40 }"
            :transition="{ duration: 0.3 }"
            class="p-8 flex flex-col gap-6"
          >
            <div>
              <h2 class="text-xl font-semibold text-highlighted">
                {{ t('onboarding.freeze_title') }}
              </h2>
              <p class="text-sm text-muted mt-1">
                {{ t('onboarding.freeze_desc') }}
              </p>
            </div>

            <UForm
              :schema="freezeSchema"
              :state="freeze"
              @submit="onFreezeSubmit"
            >
              <div class="flex flex-col gap-6">
                <div class="flex justify-between text-sm">
                  <div class="flex flex-col gap-1">
                    <span class="text-muted text-xs">SULA</span>
                    <Motion
                      :key="freeze.amount"
                      :animate="{ scale: [1, 1.05, 1] }"
                      :transition="{ duration: 0.3 }"
                    >
                      <span class="text-xl font-semibold text-highlighted font-mono">
                        {{ initialSula - freeze.amount }}
                      </span>
                    </Motion>
                  </div>
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="size-4 text-muted self-end mb-1"
                  />
                  <div class="flex flex-col gap-1 items-end">
                    <span class="text-muted text-xs">JÄÄ</span>
                    <Motion
                      :key="freeze.amount"
                      :animate="{ scale: [1, 1.05, 1] }"
                      :transition="{ duration: 0.3 }"
                    >
                      <span class="text-xl font-semibold text-sky-300 font-mono">
                        {{ freeze.amount }}
                      </span>
                    </Motion>
                  </div>
                </div>

                <UFormField
                  :label="t('onboarding.freeze_amount', { amount: freeze.amount })"
                  name="amount"
                >
                  <USlider
                    id="amount"
                    v-model="freeze.amount"
                    :min="0"
                    :max="initialSula"
                    :step="5"
                    color="primary"
                    class="w-full"
                  />
                </UFormField>
              </div>

              <div class="flex gap-2 mt-6">
                <UButton
                  :label="t('onboarding.skip')"
                  variant="ghost"
                  @click="next"
                />
                <UButton
                  type="submit"
                  color="info"
                  block
                  :label="t('onboarding.freeze_confirm')"
                  leading-icon="i-lucide-snowflake"
                />
              </div>
            </UForm>
          </Motion>

          <Motion
            v-else-if="step === 4"
            key="community"
            :initial="{ opacity: 0, x: 40 }"
            :animate="{ opacity: 1, x: 0 }"
            :exit="{ opacity: 0, x: -40 }"
            :transition="{ duration: 0.3 }"
            class="p-8 flex flex-col gap-6"
          >
            <div>
              <h2 class="text-xl font-semibold text-highlighted">
                {{ t('onboarding.community_title') }}
              </h2>
              <p class="text-sm text-muted mt-1">
                {{ t('onboarding.community_desc') }}
              </p>
            </div>

            <UForm
              :schema="communitySchema"
              :state="community"
              @submit="onCommunitySubmit"
            >
              <div class="flex flex-col gap-2">
                <Motion
                  v-for="(c, i) in mockCommunities"
                  :key="c.id"
                  :initial="{ opacity: 0, x: -12 }"
                  :animate="{ opacity: 1, x: 0 }"
                  :transition="{ delay: i * 0.07 }"
                  :while-hover="{ scale: 1.01 }"
                  :while-tap="{ scale: 0.99 }"
                  :class="[
                    'flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors',
                    community.communityId === c.id
                      ? 'border-primary/50 bg-primary/10'
                      : 'border-white/10 hover:bg-white/5'
                  ]"
                  @click="community.communityId = c.id"
                >
                  <div class="size-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <UIcon
                      :name="c.icon"
                      class="size-4 text-primary"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-highlighted">
                      {{ c.name }}
                    </p>
                    <p class="text-xs text-muted truncate">
                      {{ c.description }}
                    </p>
                  </div>
                  <div class="text-right shrink-0">
                    <p class="text-xs text-muted">
                      {{ c.members }} {{ t('onboarding.members') }}
                    </p>
                    <p class="text-xs text-primary">
                      -{{ c.cost }} SULA
                    </p>
                  </div>
                </Motion>
              </div>

              <div class="flex gap-2 mt-6">
                <UButton
                  :label="t('onboarding.skip')"
                  variant="ghost"
                  @click="next"
                />
                <UButton
                  type="submit"
                  color="primary"
                  block
                  :label="t('onboarding.join')"
                  leading-icon="i-lucide-users"
                  :disabled="!community.communityId"
                />
              </div>
            </UForm>
          </Motion>

          <Motion
            v-else-if="step === 5"
            key="done"
            :initial="{ opacity: 0, scale: 0.95 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ duration: 0.4, type: 'spring' }"
            class="p-8 flex flex-col gap-6 items-center text-center"
          >
            <Motion
              :initial="{ scale: 0, rotate: -180 }"
              :animate="{ scale: 1, rotate: 0 }"
              :transition="{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }"
            >
              <div class="size-16 rounded-full bg-success/20 border border-success/30 flex items-center justify-center">
                <UIcon
                  name="i-lucide-check"
                  class="size-8 text-success"
                />
              </div>
            </Motion>

            <div>
              <h2 class="text-2xl font-semibold text-highlighted">
                {{ t('onboarding.done_title') }}, {{ result.name }}!
              </h2>
              <p class="text-sm text-muted mt-2">
                {{ t('onboarding.done_desc') }}
              </p>
            </div>

            <div class="w-full grid grid-cols-3 gap-3">
              <div class="rounded-xl bg-white/5 border border-white/10 p-3">
                <p class="text-xs text-muted">
                  SULA
                </p>
                <p class="text-lg font-semibold text-highlighted font-mono">
                  {{ result.sula }}
                </p>
              </div>
              <div class="rounded-xl bg-white/5 border border-white/10 p-3">
                <p class="text-xs text-muted">
                  JÄÄ
                </p>
                <p class="text-lg font-semibold text-sky-300 font-mono">
                  {{ result.jaa }}
                </p>
              </div>
              <div class="rounded-xl bg-white/5 border border-white/10 p-3">
                <p class="text-xs text-muted">
                  {{ t('onboarding.community') }}
                </p>
                <p class="text-sm font-semibold text-highlighted truncate">
                  {{ selectedCommunity?.name ?? '—' }}
                </p>
              </div>
            </div>

            <UButton
              color="primary"
              block
              :label="t('onboarding.enter')"
              trailing-icon="i-lucide-arrow-right"
            />
          </Motion>
        </AnimatePresence>
      </div>
    </div>
  </div>
</template>
