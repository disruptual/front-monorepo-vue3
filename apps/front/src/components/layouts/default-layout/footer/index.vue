<script>
export default { name: 'DefaultLayoutFooter' };
</script>

<script setup>
import { vReadableColor } from '@dsp/ui';
</script>

<template>
  <footer v-readable-color class="app-footer">
    <nav>
      <ul>
        <li>
          <router-link
            :to="{
              name: 'Cms',
              params: { slug: 'conditions-generales-dutilisation' }
            }"
          >
            CGU
          </router-link>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<style lang="scss" scoped>
.app-footer {
  padding: var(--spacing-md);
  background: var(--color-brand-500);
}
</style>
