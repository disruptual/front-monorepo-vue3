<script>
export default { name: 'AppBar' };
</script>

<script setup></script>

<template>
  <nav tag="nav" class="app-bar">
    <dsp-flex as="ul" justify="space-between">
      <li>
        <dsp-icon-button
          :to="{ name: 'Home' }"
          icon="home"
          is-plain
          size="lg"
        />
      </li>
      <li>
        <dsp-icon-button
          :to="{ name: 'Inbox' }"
          icon="speechBubble"
          is-plain
          size="lg"
        />
      </li>
      <li>
        <dsp-icon-button
          :to="{ name: 'ItemCreation' }"
          icon="add"
          is-plain
          size="lg"
        />
      </li>
      <li>
        <dsp-icon-button
          :to="{ name: 'Cart' }"
          icon="cart"
          is-plain
          size="lg"
        />
      </li>
      <li>
        <dsp-icon-button
          :to="{ name: 'Home' }"
          icon="heartEmpty"
          is-plain
          size="lg"
        />
      </li>
    </dsp-flex>
  </nav>
</template>

<style lang="scss" scoped>
.app-bar {
  background: var(--color-surface);
  padding: 0;

  li a {
    display: block;
  }
}
</style>
