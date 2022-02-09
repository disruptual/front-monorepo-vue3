<script>
export default { name: 'SettingsHomeBlocks' };
</script>

<script setup>
import HomeBlocksEditor from '@/components/home-blocks-editor/index.vue';
</script>

<template>
  <dsp-container>
    <dsp-surface>
      <h2>Home Blocks</h2>
      <dsp-alert>
        Personalisez votre page d'accueil en définissant une liste de blocs
        mettant en valeur des annonces, utilisateurs ou marques
      </dsp-alert>

      <HomeBlocksEditor />
    </dsp-surface>
  </dsp-container>
</template>
