<script>
export default { name: 'UserDetails' };
</script>

<script setup>
import { ref, unref, computed } from 'vue';
import { User, USER_ROLES } from '@dsp/business';
import { useForm, useToast, useDevice, VALIDATION_MODES } from '@dsp/ui';
import { useI18n } from 'vue-i18n';
import {
  useUserApi,
  useCurrentUser,
  useDateFormat,
  formatPrice,
  isDefined
} from '@dsp/core';
import { USER_DETAILS_TABS as TABS } from '@/utils/constants';
import schema from './index.schema';

import UserActionsDropdown from './actions-dropdown/index.vue';

const props = defineProps({
  user: { type: User, required: true },
  ...schema.toProps()
});
const emit = defineEmits(['success']);
const componentContext = schema.toContext(props);

const device = useDevice();
const { format } = useDateFormat();
const { t } = useI18n();
const { data: currentUser } = useCurrentUser();
const { showError, showSuccess } = useToast();
const userApi = useUserApi();
const { mutateAsync: updateUser } = userApi.updateMutation({
  onSuccess() {
    showSuccess(t('toasts.user.updateSuccess'));
    emit('success');
  },
  onError(err) {
    console.error(err);
    showError(t('toasts.user.updateError'));
  }
});

const { mutateAsync: checkUserExists } = userApi.checkUserExistsMutation();

const isEditing = ref(false);

const form = useForm({
  onSubmit(values) {
    if (!values.plainPassword) {
      delete values.plainPassword;
      delete values.passwordConfirm;
    }
    return updateUser({ id: props.user.id, entity: values });
  }
});
const [, formActions] = form;

const availableRoles = computed(() => {
  return [
    USER_ROLES.ADMIN,
    USER_ROLES.STORE,
    USER_ROLES.EVENT_MANAGER,
    USER_ROLES.USER,
    currentUser.value.hasRole(USER_ROLES.PROJECT_MANAGER) &&
      USER_ROLES.PROJECT_MANAGER,
    currentUser.value.hasRoles(USER_ROLES.PROJECT_MANAGER, USER_ROLES.DAF) &&
      USER_ROLES.DAF
  ].filter(Boolean);
});

const passwordValidators = [
  {
    name: 'containsNumber',
    message: 'form.errors.containsNumber',
    handler(value) {
      return !isDefined(value) || /[0-9]/.test(value);
    }
  },
  {
    name: 'containsUppercase',
    message: 'form.errors.containsUppercase',
    handler(value) {
      return !isDefined(value) || /[A-Z]/.test(value);
    }
  },
  {
    name: 'containsLowercase',
    message: 'form.errors.containsLowercase',
    handler(value) {
      return !isDefined(value) || /[a-z]/.test(value);
    }
  }
];

const passwordConfirmValidators = [
  {
    name: 'passwordMatch',
    message: 'form.errors.passwordMatch',
    handler(value, { formContext }) {
      const { values } = unref(formContext);
      if (!values.plainPassword) return true;

      return value === values.value.plainPassword;
    }
  }
];

const usernameValidators = [
  {
    name: 'isExist',
    message: 'form.errors.isExist',
    handler: async value => {
      try {
        if (value === props.user.username) {
          return true;
        }
        await checkUserExists(value);
        return false;
      } catch (err) {
        return true;
      }
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
  <dsp-switch
    v-model="isEditing"
    class="editing-switch"
    :label="t('user.details.editModeSwitchLabel')"
  />
  <dsp-center as="header">
    <dsp-flex justify="center" align="center" as="h3">
      {{ user.fullName }}
      <UserActionsDropdown :user="user" @success="$emit('success')" />
    </dsp-flex>
    <dsp-avatar :user="user" size="lg" />
    <dsp-center v-if="user.isMuted" class="badge">
      {{ t('user.isMuted') }}
    </dsp-center>
    <dsp-center v-if="user.transactionWithdrawBlockedAt" class="badge">
      {{
        t('user.details.transactionWithdrawn', {
          date: format(user.transactionWithdrawBlockedAt)
        })
      }}
    </dsp-center>
  </dsp-center>

  <dsp-smart-form v-if="isEditing" class="edit-mode" :form="form">
    <dsp-grid :columns="device.isDesktop ? 2 : 1">
      <label for="username">{{ t('user.details.username') }}</label>
      <dsp-smart-form-field
        v-slot="slotProps"
        name="username"
        :initial-value="user.username"
        :validators="usernameValidators"
        :minlength="4"
        :maxlength="30"
        :mode="VALIDATION_MODES.ON_INPUT"
        required
      >
        <dsp-input-text
          id="username"
          v-model="slotProps.field.value"
          v-on="slotProps.field.listeners"
        />
        <dsp-form-error
          v-for="(error, key) in slotProps.field?.errors"
          :key="key"
          class="errors"
          :error="error"
        />
      </dsp-smart-form-field>

      <label for="lastName">{{ t('user.details.lastName') }}</label>
      <dsp-smart-form-field
        v-slot="slotProps"
        name="lastName"
        :initial-value="user.lastName"
        required
      >
        <dsp-input-text
          id="lastName"
          v-model="slotProps.field.value"
          v-bind="slotProps"
        />
        <dsp-form-error
          v-for="(error, key) in slotProps.field?.errors"
          :key="key"
          class="errors"
          :error="error"
        />
      </dsp-smart-form-field>

      <label for="firstName">{{ t('user.details.firstName') }}</label>
      <dsp-smart-form-field
        v-slot="slotProps"
        name="firstName"
        :initial-value="user.firstName"
        required
      >
        <dsp-input-text
          id="firstName"
          v-model="slotProps.field.value"
          v-bind="slotProps"
        />
        <dsp-form-error
          v-for="(error, key) in slotProps.field?.errors"
          :key="key"
          class="errors"
          :error="error"
        />
      </dsp-smart-form-field>

      <template v-if="componentContext.isSSOCustomerIdDisplayed">
        <label for="ssoCustomerId">{{ t('user.details.ssoCustomerId') }}</label>
        <dsp-smart-form-field
          v-slot="slotProps"
          name="ssoCustomerId"
          :initial-value="user.ssoCustomerId"
          required
        >
          <dsp-input-text
            id="ssoCustomerId"
            v-model="slotProps.field.value"
            v-bind="slotProps"
          />
          <dsp-form-error
            v-for="(error, key) in slotProps.field?.errors"
            :key="key"
            class="errors"
            :error="error"
          />
        </dsp-smart-form-field>
      </template>

      <label for="email">{{ t('user.details.email') }}</label>
      <dsp-smart-form-field
        v-slot="slotProps"
        name="email"
        :initial-value="user.email"
        required
        email
      >
        <dsp-input-text
          id="email"
          v-model="slotProps.field.value"
          v-bind="slotProps"
        />
        <dsp-form-error
          v-for="(error, key) in slotProps.field?.errors"
          :key="key"
          class="errors"
          :error="error"
        />
      </dsp-smart-form-field>

      <label for="content">{{ t('user.details.bio') }}</label>
      <dsp-smart-form-field
        v-slot="slotProps"
        name="content"
        :initial-value="user.content"
      >
        <dsp-input-textarea
          id="content"
          v-model="slotProps.field.value"
          v-bind="slotProps"
          :is-resizable="false"
        />
        <dsp-form-error
          v-for="(error, key) in slotProps.field?.errors"
          :key="key"
          class="errors"
          :error="error"
        />
      </dsp-smart-form-field>

      <label for="phone">{{ t('user.details.phone') }}</label>
      <dsp-smart-form-field
        v-slot="slotProps"
        name="phone"
        :pattern="new RegExp('(0|\\+33|0033)[1-9][0-9]{8}')"
        :initial-value="user.phone"
      >
        <dsp-input-text
          id="phone"
          v-model="slotProps.field.value"
          type="phone"
          v-bind="slotProps"
        />
        <dsp-form-error
          v-for="(error, key) in slotProps.field?.errors"
          :key="key"
          class="errors"
          :error="error"
        />
      </dsp-smart-form-field>

      <label for="plainPassword">{{ t('user.details.password') }}</label>
      <dsp-smart-form-field
        v-slot="slotProps"
        name="plainPassword"
        :minlength="8"
        :validators="passwordValidators"
      >
        <dsp-input-password
          id="plainPassword"
          v-model="slotProps.field.value"
          v-bind="slotProps"
        />
        <dsp-form-error
          v-for="(error, key) in slotProps.field?.errors"
          :key="key"
          class="errors"
          :error="error"
        />
      </dsp-smart-form-field>

      <label for="passwordConfirm">
        {{ t('user.details.passwordConfirm') }}
      </label>
      <dsp-smart-form-field
        v-slot="slotProps"
        name="passwordConfirm"
        :validators="passwordConfirmValidators"
      >
        <dsp-input-password
          id="passwordConfirm"
          v-model="slotProps.field.value"
          v-bind="slotProps"
        />
        <dsp-form-error
          v-for="(error, key) in slotProps.field?.errors"
          :key="key"
          class="errors"
          :error="error"
        />
      </dsp-smart-form-field>

      <label for="">
        {{ t('user.details.roles') }}
      </label>
      <dsp-smart-form-field
        v-slot="slotProps"
        :initial-value="user.roles"
        name="roles"
      >
        <div>
          <dsp-checkbox
            v-for="role in availableRoles"
            :id="role"
            :key="role"
            v-model="slotProps.field.value"
            :value="role"
            :label="t(`user.roles.${role}`)"
          />
        </div>
        <dsp-form-error
          v-for="(error, key) in slotProps.field?.errors"
          :key="key"
          class="errors"
          :error="error"
        />
      </dsp-smart-form-field>
    </dsp-grid>
    <dsp-center direction="row" class="form-actions" gap="sm">
      <dsp-button type="button" is-outlined @click="formActions.reset">
        {{ t('user.details.form.cancel') }}
      </dsp-button>
      <dsp-smart-form-submit>
        {{ t('user.details.form.submit') }}
      </dsp-smart-form-submit>
    </dsp-center>
  </dsp-smart-form>

  <dsp-flex v-else class="display-mode" justify="center">
    <dl>
      <dsp-grid :columns="device.isMobile ? 1 : 2">
        <dt>{{ t('user.details.username') }}</dt>
        <dd>{{ user.username }}</dd>

        <dt>{{ t('user.details.lastName') }}</dt>
        <dd>{{ user.lastName }}</dd>

        <dt>{{ t('user.details.firstName') }}</dt>
        <dd>{{ user.firstName }}</dd>

        <template v-if="componentContext.isSSOCustomerIdDisplayed">
          <dt>{{ t('user.details.ssoCustomerId') }}</dt>
          <dd>{{ user.ssoCustomerId }}</dd>
        </template>

        <dt>{{ t('user.details.email') }}</dt>
        <dd>{{ user.email }}</dd>

        <dt>{{ t('user.details.bio') }}</dt>
        <dd>{{ user.content }}</dd>

        <dt>{{ t('user.details.phone') }}</dt>
        <dd>{{ user.phone }}</dd>

        <dt>{{ t('user.details.deliveries') }}</dt>
        <dsp-flex gap="sm">
          <dd>
            <ul>
              <li v-for="delivery in user.deliveries" :key="delivery">
                {{ t(`delivery.modes.${delivery.tag}`) }}
              </li>
            </ul>
          </dd>
        </dsp-flex>

        <dt>{{ t('user.details.ibanCount') }}</dt>
        <dd>{{ user.ibans?.length }}</dd>

        <dt>{{ t('user.details.itemCount') }}</dt>
        <dd>
          {{ user.items?.length }}
          <router-link :to="itemsLink">
            ({{ t('user.details.seeDetails') }})
          </router-link>
        </dd>

        <dt>{{ t('user.details.orderCount') }}</dt>
        <dd>
          {{ user.orders?.length }}
          <router-link :to="ordersLink">
            ({{ t('user.details.seeDetails') }})
          </router-link>
        </dd>

        <dt>{{ t('user.details.roles') }}</dt>
        <dd>{{ formattedRoles }}</dd>

        <dt>{{ t('user.details.moneyPotCash') }}</dt>
        <dd>{{ formatPrice(user.transactionSum?.CASH) }}</dd>

        <dt>{{ t('user.details.moneyPotGiftcard') }}</dt>
        <dd>{{ formatPrice(user.transactionSum?.GIFTCARD) }}</dd>

        <dt>{{ t('user.details.address') }}</dt>
        <dd v-if="user.mainAddress">
          <div>{{ user.mainAddress.route }}</div>
          <div>
            {{ user.mainAddress.postalCode }} {{ user.mainAddress.city }}
          </div>
          <div>{{ user.mainAddress.country }}</div>
        </dd>
        <dd v-else>{{ t('user.details.noAddress') }}</dd>
      </dsp-grid>
    </dl>
  </dsp-flex>
</template>

<style lang="scss" scoped>
.edit-mode .dsp-grid {
  margin: var(--spacing-lg) 0 var(--spacing-md) 0;
}
.display-mode .dsp-grid {
  margin: var(--spacing-sm) 0 var(--spacing-sm) 0;
}
.display-mode,
.edit-mode {
  .dsp-grid {
    line-height: 1.5;

    @include desktop-only {
      --label-min-width: 180px;
      display: grid;
      grid-template-columns: minmax(var(--label-min-width), auto) 1fr;
      gap: var(--spacing-sm);
      align-items: center;
    }

    dt,
    label {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-light);

      @include desktop-only {
        text-align: end;
      }
      @include not-desktop {
        margin-top: var(--spacing-md);
      }
    }

    dd {
      margin: 0;
    }
  }
}

.errors {
  grid-column: 1/-1;
  text-align: end;
  & :deep(.dsp-form-error) {
    justify-content: end;
  }
}

a {
  color: var(--color-brand-500);
}

.editing-switch {
  margin-left: auto;
  width: fit-content;
  font-size: var(--font-size-sm);
}

.badge {
  margin-top: var(--spacing-sm);
  color: var(--color-red-500);
  border-radius: var(--border-radius-pill);
  padding: var(--spacing-xxs) var(--spacing-xs);
  font-size: var(--font-size-sm);
  border: solid 2px var(--color-red-500);
}

dd ul {
  padding-left: 0;
}

header h3 {
  margin-top: 0;
}
</style>
