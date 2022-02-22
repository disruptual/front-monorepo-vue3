<script>
export default { name: 'AdminContactDetailPage' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import frLocale from 'date-fns/locale/fr';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useContactApi, useUserApi } from '@dsp/core';
import { VALIDATION_MODES, useToast, useForm } from '@dsp/ui';
import { formatDistanceToNow } from 'date-fns';
import { CONTACT_STATUSES } from '@dsp/business';
import { CONTACT_STATUS_COLORS } from '@/utils/constants';
import { useQueryClient } from 'vue-query';

const props = defineProps({
  id: { type: String, required: true }
});

useBreadCrumbs(`${props.id}`);
const { t } = useI18n();
const { showError } = useToast();

const queryClient = useQueryClient();

const {
  findByIdQuery: findContactById,
  createMutation: createContactMutation,
  updateMutation: updateContactMutation
} = useContactApi();

const query = findContactById(props.id, {
  relations: []
});

const { data: users } = useUserApi().findAllQuery(
  computed(() => ({
    filters: {
      email: query.data.value?.email
    },
    enabled: query.isSuccess.value
  }))
);

const { mutateAsync: createContact } = createContactMutation({
  onSuccess() {
    query.refetch.value();
    reset();
  },
  onError(err) {
    console.error(err);
    showError(t('contact.submitError'));
  }
});

const { mutate: updateContact } = updateContactMutation({
  onSuccess() {
    query.refetch.value();
  },
  onError(err) {
    console.error(err);
  },
  onMutate: async ({ id, entity }) => {
    queryClient.setQueryData(`/contacts/${query.data.value.id}`, old => ({
      ...old,
      ...entity
    }));

    return { id, entity };
  }
});

const updateStatus = newStatus =>
  updateContact({ id: query.data.value?.id, entity: { status: newStatus } });

const form = useForm({
  onSubmit: values => {
    const { value: contact } = query.data;
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

    return createContact(data);
  },
  mode: VALIDATION_MODES.ON_BLUR
});
const [, { reset }] = form;

const sortedReplies = computed(() =>
  query.data.value?.sheets
    .slice()
    .sort(
      (contact1, contact2) =>
        new Date(contact1.created).getTime() -
        new Date(contact2.created).getTime()
    )
);

const getTimeAgo = response => {
  const time = formatDistanceToNow(new Date(response.created), {
    locale: frLocale
  });
  return t('contact.response.timeAgo', { time });
};

const user = computed(() => users.value?.[0]);
const isDropdownOpened = ref(false);
</script>

<template>
  <dsp-query-loader v-slot="{ entity: contact }" :query="query">
    <dsp-container>
      <dsp-surface>
        <dsp-container is-small>
          <dsp-flex gap="md" align="center">
            <dsp-avatar v-if="user" :user="user" size="md" />

            <h2>{{ contact.firstName }} {{ contact.lastName }}</h2>
            <span class="contact__date">
              {{ contact.formatCreated('dd/MM/yyyy') }}
            </span>
          </dsp-flex>

          <dsp-dropdown
            v-model:isOpened="isDropdownOpened"
            class="status-dropdown"
            :style="{ '--color': CONTACT_STATUS_COLORS[contact.status] }"
          >
            <template #toggle>
              <dsp-flex class="status" gap="md" align="center">
                {{ t(`contact.status.${contact.status}`) }}
                <dsp-icon icon="caretDown" />
              </dsp-flex>
            </template>
            <template #menu>
              <dsp-dropdown-item
                v-for="status in Object.values(CONTACT_STATUSES)"
                :key="status"
                @click="updateStatus(status)"
              >
                <span
                  class="status"
                  :style="{ '--color': CONTACT_STATUS_COLORS[status] }"
                >
                  {{ t(`contact.status.${status}`) }}
                </span>
              </dsp-dropdown-item>
            </template>
          </dsp-dropdown>

          <dl>
            <dt>{{ t('contact.details.email') }}</dt>
            <dd>
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
            </dd>

            <dt>{{ t('contact.details.content') }}</dt>
            <dd>{{ contact.content }}</dd>

            <dt>{{ t('contact.details.response') }}</dt>
            <dd>
              <div
                v-for="response in sortedReplies"
                :key="response.id"
                class="resppnse"
              >
                <div class="response__timestamp">
                  {{ getTimeAgo(response) }}
                </div>
                <div>
                  {{ response.content }}
                </div>
              </div>
            </dd>
          </dl>

          <div class="form">
            <dsp-smart-form :form="form">
              <dsp-smart-form-field v-slot="slotProps" name="response" required>
                <dsp-form-control
                  v-slot="{ on, ...formControlProps }"
                  v-model="slotProps.field.value"
                  :label="t('contact.form.response')"
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
dl {
  display: grid;
  grid-template-columns: 8em 1fr;
  grid-gap: var(--spacing-md);

  @include mobile-only {
    grid-template-columns: 1fr;
  }
}

dd {
  margin: 0;
}

dt {
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
  position: sticky;
  bottom: 0;
  background: var(--color-surface);
}

.resppnse {
  margin-bottom: var(--spacing-md);
}

.response__timestamp {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
}

.contact__date {
  margin-left: auto;
}

a {
  color: inherit;
}

.status {
  color: var(--color);
}

.status-dropdown {
  margin-left: auto;

  border: solid 1px var(--color);
}
</style>
