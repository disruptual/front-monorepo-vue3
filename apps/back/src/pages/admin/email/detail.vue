<script>
export default { name: 'AdminEmailDetailPage' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useEmailApi } from '@dsp/core';
import { vTooltip, useToast } from '@dsp/ui';
import { encode } from 'html-entities';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: { type: String, required: true }
});
const { t } = useI18n();
const { push } = useRouter();
const filters = ref({});
const { showError, showSuccess } = useToast();
const query = useEmailApi().findByIdQuery(props.id, {
  requestOptions: { params: { display: 'all' } }
});
const emit = defineEmits(['success']);
const { mutate } = useEmailApi().updateMutation({
  onSuccess() {
    showSuccess(t('toasts.email.updateSuccess'));
    emit('success');
    push({ name: 'AdminEmail' });
  },
  onError(err) {
    console.error(err);
    showError(t('toasts.email.updateSuccess'));
  }
});
const breadCrumbLabel = computed(
  () => query.data.value?.title ?? t('breadcrumb.mailDetails')
);
const decodedContent = computed({
  get() {
    const txt = document.createElement('textarea');
    txt.innerHTML = query.data.value.body;
    return txt.value;
  },
  set(value) {
    query.data.value.body = encode(value);
  }
});
const onSubmit = async values => {
  return mutate({ id: props.id, entity: values });
};
const formOptions = {
  onSubmit
};
useBreadCrumbs(breadCrumbLabel);
</script>

<template>
  <dsp-query-loader v-slot="{ entity: email }" :query="query">
    <dsp-container is-small class="email-details">
      <dsp-flex align="center" direction="column">
        <h2>{{ email.name }}</h2>
        <dsp-flex gap="sm">
          <label>{{ t('email.details.id') }}</label>
          <span>
            {{ email.id }}
          </span>
        </dsp-flex>
      </dsp-flex>
      <dsp-smart-form :form-options="formOptions">
        <div class="email-form">
          <dsp-surface>
            <dsp-smart-form-field
              v-slot="slotProps"
              name="subject"
              :initial-value="email.subject"
              required
            >
              <dsp-form-control
                v-model="slotProps.field.value"
                :label="t('email.details.subject')"
                v-bind="slotProps"
              />
            </dsp-smart-form-field>
          </dsp-surface>
          <dsp-surface>
            <dsp-smart-form-field
              v-slot="slotProps"
              name="body"
              :initial-value="decodedContent"
              required
            >
              <dsp-form-control
                v-slot="{ on, ...formControlProps }"
                v-model="slotProps.field.value"
                :label="t('email.details.body')"
                v-bind="slotProps"
              >
                <dsp-input-textarea
                  v-model="slotProps.field.value"
                  v-bind="formControlProps"
                  :isResizable="false"
                  v-on="on"
                />
              </dsp-form-control>
            </dsp-smart-form-field>
          </dsp-surface>

          <dsp-center>
            <dsp-smart-form-submit>
              {{ t('email.details.form.submit') }}
            </dsp-smart-form-submit>
          </dsp-center>
        </div>
      </dsp-smart-form>
    </dsp-container>
  </dsp-query-loader>
</template>

<style lang="scss" scoped>
.email-details {
  padding-top: var(--spacing-lg);
  padding-bottom: var(--spacing-lg);
  display: grid;
  grid-gap: var(--spacing-md);
  @include mobile-only {
    padding: var(--spacing-sm);
  }
}

.dsp-input-text,
.textarea {
  min-width: $breakpoint-mobile;
}

.flex {
  flex: 1;
}
.email-form {
  display: grid;
  grid-gap: var(--spacing-md);
}
</style>
