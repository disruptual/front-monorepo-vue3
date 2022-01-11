<script>
export default { name: 'AdminContactDetailPage' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useContactApi, useUserApi } from '@dsp/core';
import { VALIDATION_MODES } from '@dsp/ui';

const props = defineProps({
  id: { type: String, required: true }
});

useBreadCrumbs(`${props.id}`);

const { t } = useI18n();
const query = useContactApi().findContactByIdQuery(props.id, {
  relations: []
});
const userQueryOptions = computed(() => ({
  filters: {
    email: query.data.value?.email
  },
  enabled: query.isSuccess.value
}));
const { data: users, isSuccess } = useUserApi().findAllQuery(userQueryOptions);

const { mutateAsync } = useContactApi().createMutation();

const onSubmit = async values => {
  try {
    const contact = query.data.value;
    const { firstName, lastName, uri, service } = contact;
    const email = service
      ? service.email[0]
      : import.meta.env.VITE_CONTACT_EMAIL;
    const data = {
      email,
      firstName,
      lastName,
      content: values.response,
      root: uri,
      service
    };
    const result = await mutateAsync(data);
    query.data.value.sheets.push(result.content);
    return result;
  } catch (err) {
    console.log(err);
  }
};

const formOptions = {
  onSubmit,
  mode: VALIDATION_MODES.ON_BLUR
};
</script>

<template>
  <dsp-query-loader v-slot="{ entity: contact }" :query="query">
    <dsp-container>
      <dsp-surface>
        <dsp-container is-small>
          <dsp-flex justify="space-between" align="center">
            <h1>
              <span>{{ contact.firstName }} {{ contact.lastName }}</span>
            </h1>
            <div>
              <span>{{ contact.formatCreated('dd/MM/yyyy') }}</span>
            </div>
          </dsp-flex>
          <dsp-flex align="center">
            <span class="label">{{ t('contact.details.email') }}</span>
            <span>{{ contact.email }}</span>
            <router-link
              v-if="users"
              class="see-more"
              :to="{
                name: 'AdminUserDetails',
                params: { slug: users[0].slug }
              }"
            >
              ({{ t('contact.details.seeMore') }})
            </router-link>
          </dsp-flex>
          <dsp-flex align="center">
            <span class="label">{{ t('contact.details.content') }}</span>
            <span>{{ contact.content }}</span>
          </dsp-flex>
          <dsp-flex align="center">
            <div v-for="response in contact.sheets" :key="response.id">
              <span class="label">{{ t('contact.details.response') }}</span>
              {{ response.content }}
              <br />
            </div>
          </dsp-flex>
          <div class="form">
            <dsp-smart-form :form-options="formOptions">
              <dsp-smart-form-field v-slot="slotProps" name="response" required>
                <dsp-form-control
                  v-slot="{ on, ...formControlProps }"
                  v-model="slotProps.field.value"
                  :label="t('contact.details.response')"
                  v-bind="slotProps"
                >
                  <dsp-input-textarea
                    v-model="slotProps.field.value"
                    v-bind="formControlProps"
                    v-on="on"
                  />
                </dsp-form-control>
              </dsp-smart-form-field>

              <dsp-flex direction="row-reverse" justify="space-between">
                <dsp-smart-form-submit>
                  {{ t('contact.details.send') }}
                </dsp-smart-form-submit>
              </dsp-flex>
            </dsp-smart-form>
          </div>
        </dsp-container>
      </dsp-surface>
    </dsp-container>
  </dsp-query-loader>
</template>

<style lang="scss" scoped>
.label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-light);
  margin-right: var(--spacing-sm);
}

.dsp-container > .dsp-flex {
  margin: var(--spacing-sm) 0;
}

.see-more {
  padding: 0 var(--spacing-sm);
}

.form {
  margin: var(--spacing-md) 0;
}
</style>
