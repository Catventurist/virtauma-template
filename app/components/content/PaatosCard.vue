<script setup lang="ts">
import { Motion } from 'motion-v'
import type { Decision, DecisionResponse } from '~/types/resource'
import { decisionMeta } from '~/composables/usePaatos'

const props = defineProps<{
  decision: Decision
  userId: string
}>()

const { respond, placeStone, withdrawStone, close, dissolve, canClose, timeRemaining, isQuorate, result } = usePaatos()
const { t } = useI18n()

const meta = computed(() => decisionMeta[props.decision.type])

const userResponse = computed(() =>
  props.decision.responses.find(r => r.userId === props.userId)
)

const userStone = computed(() =>
  props.decision.stones?.find(s => s.userId === props.userId && !s.withdrawnAt)
)

const activeStones = computed(() =>
  (props.decision.stones ?? []).filter(s => !s.withdrawnAt)
)

const participation = computed(() =>
  props.decision.responses.length
)

const stoneText = ref('')
const showStoneInput = ref(false)

const castResponse = (value: DecisionResponse['value']) => {
  respond(props.decision.id, {
    userId: props.userId,
    value,
    weight: 1,
    createdAt: new Date().toISOString()
  })
}

const castStone = () => {
  if (!stoneText.value.trim()) return
  placeStone(props.decision.id, {
    userId: props.userId,
    text: stoneText.value.trim(),
    createdAt: new Date().toISOString()
  })
  stoneText.value = ''
  showStoneInput.value = false
}
</script>

<template>
  <Motion
    as="div"
    :initial="{ opacity: 0, y: 16 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8, ease: 'easeOut' }"
    class="flex flex-col gap-6"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2 flex-wrap">
          <UIcon
            :name="meta.icon"
            class="size-5"
            :class="`text-${meta.color}`"
          />
          <UBadge
            :label="t(`paatos.type.${decision.type}`)"
            :color="meta.color"
            variant="soft"
            size="xs"
          />
          <UBadge
            v-if="decision.status !== 'open'"
            :label="t(`paatos.status.${decision.status}`)"
            color="neutral"
            variant="subtle"
            size="xs"
          />
        </div>
        <h2 class="text-xl font-semibold text-highlighted">
          {{ decision.title }}
        </h2>
        <p
          v-if="decision.description"
          class="text-sm text-toned leading-relaxed"
        >
          {{ decision.description }}
        </p>
      </div>

      <div class="flex flex-col items-end gap-1 shrink-0">
        <span
          v-if="decision.status === 'open'"
          class="text-sm font-medium"
          :class="timeRemaining(decision) ? 'text-muted' : 'text-error'"
        >
          {{ timeRemaining(decision) ?? t('paatos.closing') }}
        </span>
        <span class="text-xs text-muted">
          {{ participation }} {{ t('paatos.responses') }}
        </span>
        <span
          v-if="!isQuorate(decision)"
          class="text-xs text-muted"
        >
          {{ t('paatos.not_quorate') }}
        </span>
      </div>
    </div>

    <USeparator color="neutral" />

    <template v-if="decision.status === 'open'">
      <div
        v-if="decision.type === 'kaste'"
        class="flex gap-3"
      >
        <UButton
          :label="t('paatos.yes')"
          :color="userResponse?.value === true ? 'success' : 'neutral'"
          :variant="userResponse?.value === true ? 'subtle' : 'ghost'"
          leading-icon="i-lucide-check"
          @click="castResponse(true)"
        />
        <UButton
          :label="t('paatos.no')"
          :color="userResponse?.value === false ? 'error' : 'neutral'"
          :variant="userResponse?.value === false ? 'subtle' : 'ghost'"
          leading-icon="i-lucide-x"
          @click="castResponse(false)"
        />
      </div>

      <div
        v-else-if="decision.type === 'haara'"
        class="flex flex-col gap-2"
      >
        <UButton
          v-for="option in decision.options"
          :key="option.id"
          :label="option.label"
          :color="userResponse?.value === option.id ? meta.color : 'neutral'"
          :variant="userResponse?.value === option.id ? 'subtle' : 'ghost'"
          block
          @click="castResponse(option.id)"
        />
      </div>

      <div
        v-else-if="decision.type === 'pato'"
        class="flex flex-col gap-4"
      >
        <div class="flex gap-3">
          <UButton
            :label="t('paatos.consent')"
            :color="userResponse?.value === 'consent' ? 'success' : 'neutral'"
            :variant="userResponse?.value === 'consent' ? 'subtle' : 'ghost'"
            leading-icon="i-lucide-check"
            @click="castResponse('consent')"
          />
          <UButton
            v-if="!userStone"
            :label="t('paatos.place_stone')"
            color="warning"
            variant="ghost"
            leading-icon="i-lucide-shield"
            @click="showStoneInput = true"
          />
          <UButton
            v-else
            :label="t('paatos.withdraw_stone')"
            color="neutral"
            variant="ghost"
            leading-icon="i-lucide-shield-off"
            @click="withdrawStone(decision.id, userId)"
          />
        </div>

        <div
          v-if="showStoneInput"
          class="flex gap-2"
        >
          <UInput
            v-model="stoneText"
            :placeholder="t('paatos.stone_placeholder')"
            class="flex-1"
            @keydown.enter="castStone"
            @keydown.escape="showStoneInput = false"
          />
          <UButton
            color="warning"
            variant="subtle"
            icon="i-lucide-shield"
            :disabled="!stoneText.trim()"
            @click="castStone"
          />
        </div>

        <div
          v-if="activeStones.length"
          class="flex flex-col gap-2"
        >
          <span class="text-xs text-muted uppercase tracking-widest">{{ t('paatos.stones') }}</span>
          <div
            v-for="stone in activeStones"
            :key="stone.userId"
            class="text-sm text-toned p-3 rounded-lg bg-warning/5 border border-warning/20"
          >
            {{ stone.text }}
          </div>
        </div>
      </div>

      <div
        v-else-if="decision.type === 'tulva'"
        class="flex gap-3"
      >
        <UButton
          :label="t('paatos.acknowledge')"
          :color="userResponse?.value === 'acknowledge' ? meta.color : 'neutral'"
          :variant="userResponse?.value === 'acknowledge' ? 'subtle' : 'ghost'"
          leading-icon="i-lucide-zap"
          @click="castResponse('acknowledge')"
        />
      </div>

      <div
        v-else
        class="flex gap-3"
      >
        <UButton
          :label="t('paatos.consent')"
          :color="userResponse?.value === 'consent' ? 'success' : 'neutral'"
          :variant="userResponse?.value === 'consent' ? 'subtle' : 'ghost'"
          leading-icon="i-lucide-check"
          @click="castResponse('consent')"
        />
        <UButton
          :label="t('paatos.objection')"
          :color="userResponse?.value === 'objection' ? 'error' : 'neutral'"
          :variant="userResponse?.value === 'objection' ? 'subtle' : 'ghost'"
          leading-icon="i-lucide-x"
          @click="castResponse('objection')"
        />
      </div>
    </template>

    <div
      v-if="result(decision)"
      class="flex flex-col gap-1"
    >
      <USeparator color="neutral" />
      <span class="text-xs text-muted uppercase tracking-widest pt-2">{{ t('paatos.result') }}</span>
      <span class="text-sm font-medium text-highlighted">{{ result(decision) }}</span>
    </div>

    <div
      v-if="decision.status === 'open' && canClose(decision)"
      class="flex gap-3 pt-2"
    >
      <UButton
        :label="t('paatos.close')"
        color="primary"
        variant="subtle"
        leading-icon="i-lucide-anchor"
        @click="close(decision.id)"
      />
      <UButton
        :label="t('paatos.dissolve')"
        color="neutral"
        variant="ghost"
        leading-icon="i-lucide-waves"
        @click="dissolve(decision.id)"
      />
    </div>
  </Motion>
</template>
