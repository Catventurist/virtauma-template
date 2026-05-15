<script setup lang="ts">
const { locale } = useI18n()
const { navi } = useDocs()
</script>

<template>
  <div>
    <VHeader />
    <UMain>
      <UContainer>
        <UPage>
          <template #left>
            <UPageAside>
              <template #top>
                <UContentSearchButton
                  :key="locale"
                  :collapsed="false"
                />
              </template>
              <ClientOnly>
                <UContentNavigation
                  :navigation="navi"
                  highlight
                />
              </ClientOnly>
            </UPageAside>
          </template>
          <slot />
        </UPage>
      </UContainer>
    </UMain>
    <VFooter />
  </div>
</template>
