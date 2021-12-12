<script>
export default { name: 'AdminContactDetailPage' };
</script>

<script setup>
import { useI18n } from 'vue-i18n';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useContactApi } from '@dsp/core';
import { VALIDATION_MODES } from '@dsp/ui';

const props = defineProps({
  id: { type: String, required: true }
});

useBreadCrumbs(`${props.id}`);

const { t } = useI18n();
const query = useContactApi().findContactByIdQuery(props.id, {
  relations: []
});

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
          <div>
            <span>Date:</span>
            <span>{{ contact.formatCreated() }}</span>
          </div>
          <div>
            <span>Client:</span>
            <span>{{ contact.firstName }} {{ contact.lastName }}</span>
          </div>
          <div>
            <span>Email:</span>
            <span>{{ contact.email }}</span>
          </div>
          <div>
            <span>Message:</span>
            <span>{{ contact.content }}</span>
          </div>
          <div>
            <div v-for="response in contact.sheets" :key="response.id">
              <span>Réponse:</span>
              {{ response.content }}
              <br />
            </div>
          </div>
          <div>
            <dsp-smart-form :form-options="formOptions">
              <dsp-smart-form-field v-slot="slotProps" name="response" required>
                <dsp-form-control
                  v-slot="{ on, ...formControlProps }"
                  v-model="slotProps.field.value"
                  label="Réponse:"
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
                <dsp-smart-form-submit>Submit</dsp-smart-form-submit>
              </dsp-flex>
            </dsp-smart-form>
          </div>
        </dsp-container>
      </dsp-surface>
    </dsp-container>
  </dsp-query-loader>
</template>
