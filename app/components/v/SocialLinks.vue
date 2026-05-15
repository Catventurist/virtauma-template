<script setup lang="ts">
export interface SocialLink {
  platform: 'discord' | 'x' | 'github' | 'gitlab' | 'telegram' | 'signal' | 'instagram' | 'youtube' | 'hive' | 'facebook' | 'website'
  url: string
  label?: string
}

withDefaults(defineProps<{
  links: SocialLink[]
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'ghost' | 'subtle' | 'soft'
}>(), {
  size: 'sm',
  variant: 'ghost'
})

const iconMap: Record<SocialLink['platform'], string> = {
  discord: 'i-simple-icons-discord',
  x: 'i-simple-icons-x',
  github: 'i-simple-icons-github',
  gitlab: 'i-simple-icons-gitlab',
  telegram: 'i-simple-icons-telegram',
  signal: 'i-simple-icons-signal',
  instagram: 'i-simple-icons-instagram',
  youtube: 'i-simple-icons-youtube',
  hive: 'i-simple-icons-hive-blockchain',
  facebook: 'i-simple-icons-facebook',
  website: 'i-lucide-globe'
}

const labelMap: Record<SocialLink['platform'], string> = {
  discord: 'Discord',
  x: 'X',
  github: 'GitHub',
  gitlab: 'GitLab',
  telegram: 'Telegram',
  signal: 'Signal',
  instagram: 'Instagram',
  youtube: 'YouTube',
  hive: 'Hive',
  facebook: 'Facebook',
  website: 'Website'
}
</script>

<template>
  <div class="flex items-center gap-1">
    <UTooltip
      v-for="link in links"
      :key="link.platform"
      :text="link.label ?? labelMap[link.platform]"
    >
      <UButton
        :icon="iconMap[link.platform]"
        :size="size"
        :variant="variant"
        color="neutral"
        :to="link.url"
        target="_blank"
        rel="noopener noreferrer"
      />
    </UTooltip>
  </div>
</template>
