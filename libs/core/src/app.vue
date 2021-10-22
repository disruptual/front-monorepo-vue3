<script setup>
import { reactive } from 'vue';
import { useAuth, useCurrentUser } from './hooks';

const { login, logout } = useAuth();

const form = reactive({ username: '', password: '' });
const onSubmit = () => {
  login(form);
};

const { isLoading, data: currentUser } = useCurrentUser();
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <form v-else-if="!currentUser" @submit.prevent="onSubmit">
    <label>
      Email
      <input v-model="form.username" />
    </label>
    <label>
      Password
      <input v-model="form.password" type="password" />
    </label>
    <button :disabled="isLoading">Submit</button>
  </form>

  <div v-else>
    <p>Hello, {{ currentUser.firstName }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>
