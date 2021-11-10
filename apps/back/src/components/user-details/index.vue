<script>
export default { name: 'UserDetails' };
</script>

<script setup>
import { ref, unref, computed } from 'vue';
import { User, USER_ROLES } from '@dsp/business';
import { useForm } from '@dsp/ui';
import { useI18n } from 'vue-i18n';
import { useUserApi } from '@dsp/core';
import { USER_DETAILS_TABS as TABS } from '@/utils/constants';

const props = defineProps({
  user: { type: User, required: true }
});

const { t } = useI18n();
const userApi = useUserApi();
const { mutateAsync: updateUser } = userApi.updateMutation();

const isEditing = ref(false);

const form = useForm({
  onSubmit(values) {
    return updateUser({ id: props.user.id, entity: values });
  }
});
const [, formActions] = form;

const passwordConfirmValidators = [
  {
    name: 'passwordMatch',
    message: t('form.errors.passwordMatch'),
    handler(value, { formContext }) {
      const { values } = unref(formContext);

      return value === values.value.plainPassword;
    }
  }
];

const formattedRoles = computed(() =>
  props.user.roles.map(role => t(`user.roles.${role}`)).join(' - ')
);

const itemsLink = computed(() => ({
  query: { section: TABS.ITEMS }
}));
const ordersLink = computed(() => ({
  query: { section: TABS.ORDERS }
}));
</script>

<template>
  <dsp-center>
    <h2>
      <dsp-flex justify="space-between" align="center">
        {{ user.fullName }}
        <dsp-icon-button
          icon="edit"
          size="sm"
          class="edit-button"
          @click="isEditing = !isEditing"
        />
      </dsp-flex>
    </h2>
    <dsp-avatar :user="user" size="lg" />
  </dsp-center>

  <dsp-smart-form :form="form" class="infos">
    <div>Nom</div>
    <dsp-smart-form-field
      v-if="isEditing"
      v-slot="slotProps"
      name="lastName"
      :initial-value="user.lastName"
      required
    >
      <dsp-input-text v-model="slotProps.field.value" v-bind="slotProps" />
    </dsp-smart-form-field>
    <div v-else>{{ user.lastName }}</div>

    <div>Prénom</div>
    <dsp-smart-form-field
      v-if="isEditing"
      v-slot="slotProps"
      name="firstName"
      :initial-value="user.firstName"
      required
    >
      <dsp-input-text v-model="slotProps.field.value" v-bind="slotProps" />
    </dsp-smart-form-field>
    <div v-else>{{ user.firstName }}</div>

    <div>E-mail</div>
    <dsp-smart-form-field
      v-if="isEditing"
      v-slot="slotProps"
      name="email"
      :initial-value="user.email"
      required
      email
    >
      <dsp-input-text v-model="slotProps.field.value" v-bind="slotProps" />
    </dsp-smart-form-field>
    <div v-else>{{ user.email }}</div>

    <div>Description</div>
    <dsp-smart-form-field
      v-if="isEditing"
      v-slot="slotProps"
      name="content"
      :initial-value="user.content"
    >
      <dsp-input-text v-model="slotProps.field.value" v-bind="slotProps" />
    </dsp-smart-form-field>
    <div v-else>{{ user.content }}</div>

    <div>N° de Téléphone</div>
    <dsp-smart-form-field
      v-if="isEditing"
      v-slot="slotProps"
      name="phone"
      :initial-value="user.phone"
    >
      <dsp-input-text
        v-model="slotProps.field.value"
        type="phone"
        v-bind="slotProps"
      />
    </dsp-smart-form-field>
    <div v-else>{{ user.phone }}</div>

    <template v-if="isEditing">
      <div>Mot de passe</div>
      <dsp-smart-form-field v-slot="slotProps" name="password">
        <dsp-input-password
          v-model="slotProps.field.value"
          v-bind="slotProps"
        />
      </dsp-smart-form-field>

      <div>Confirmer le Mot de passe</div>
      <dsp-smart-form-field
        v-slot="slotProps"
        name="passwordConfirm"
        :validators="passwordConfirmValidators"
      >
        <dsp-input-password
          v-model="slotProps.field.value"
          v-bind="slotProps"
        />
      </dsp-smart-form-field>
    </template>

    <div>Modes de livraison activés</div>
    <dsp-flex>
      <div v-for="delivery in user.deliveries" :key="delivery">
        {{ t(`delivery.modes.${delivery.tag}`) }}
      </div>
    </dsp-flex>

    <div>Nombre d'ibans</div>
    <div>{{ user.ibans?.length }}</div>

    <div>Nombre d'articles</div>
    <div>
      {{ user.items?.length }}
      <router-link :to="itemsLink">(voir le détail)</router-link>
    </div>

    <div>Nombre de commandes</div>
    <div>
      {{ user.orders?.length }}
      <router-link :to="ordersLink">(voir le détail)</router-link>
    </div>

    <div>Permissions</div>
    <dsp-smart-form-field
      v-if="isEditing"
      v-slot="slotProps"
      :initial-value="user.roles"
      name="roles"
    >
      <div>
        <dsp-checkbox
          v-for="role in Object.values(USER_ROLES)"
          :id="role"
          :key="role"
          v-model="slotProps.field.value"
          :value="role"
          :label="t(`user.roles.${role}`)"
        />
      </div>
    </dsp-smart-form-field>
    <div v-else>{{ formattedRoles }}</div>

    <dsp-flex
      v-if="isEditing"
      justify="space-between"
      class="form-actions"
      gap="sm"
    >
      <dsp-button type="button" is-outlined @click="formActions.reset">
        Annuler
      </dsp-button>
      <dsp-smart-form-submit v-if="isEditing">
        Enregistrer
      </dsp-smart-form-submit>
    </dsp-flex>
  </dsp-smart-form>
</template>

<style lang="scss" scoped>
.infos {
  margin-top: var(--spacing-sm);
  line-height: 1.5;

  @include desktop-only {
    --label-min-width: 180px;
    display: grid;
    grid-template-columns: minmax(var(--label-min-width), auto) 1fr;
    gap: var(--spacing-sm);
    align-items: center;
  }

  & > *:nth-child(odd) {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-light);
    @include desktop-only {
      text-align: right;
    }
    @include not-desktop {
      margin-top: var(--spacing-md);
    }
  }
}

.edit-button {
  transform: translateY(-50%);
}

.form-actions {
  grid-column: 1 / -1;
  button {
    flex-grow: 1;
  }
}

a {
  color: var(--color-brand-500);
}
</style>
