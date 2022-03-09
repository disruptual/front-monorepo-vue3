<script>
export default { name: 'DspAvatar' };
</script>

<script setup>
import { computed } from 'vue';
import { User } from '@dsp/business';
import { oneOf } from '@dsp/core';
import { useReadableColor } from '@dsp/ui//hooks';

const props = defineProps({
  user: { type: User, required: true },
  size: oneOf(['xs', 'sm', 'md', 'lg', 'xl'], 'sm'),
  thumbnail: oneOf(['avatar', 'avatarList'], 'avatar')
});

const initials = computed(() => {
  return `${
    props.user?.firstName?.charAt?.(0) + props.user?.lastName?.charAt?.(0) ||
    props.user?.username?.charAt?.(0) ||
    ''
  }`;
});

const computedSize = computed(() => `var(--avatar-size-${props.size})`);

const textColor = useReadableColor('--color-brand-500');
</script>

<template>
  <div class="avatar">
    <dsp-image
      v-if="user.avatar"
      :src="user.avatar.thumbnails[props.thumbnail]"
      :alt="user.firstName"
    />
    <dsp-flex v-else class="initials" align="center" justify="center">
      {{ initials }}
    </dsp-flex>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  --avatar-size-xs: 1rem;
  --avatar-size-sm: 2rem;
  --avatar-size-md: 3rem;
  --avatar-size-lg: 4.5rem;
  --avatar-size-xl: 7rem;
  padding: 0;
  border-radius: 50%;
  width: v-bind('computedSize');
  height: v-bind('computedSize');
  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}

.initials {
  background-color: var(--color-brand-500);
  color: v-bind(textColor);
  width: 100%;
  height: 100%;
}
</style>
