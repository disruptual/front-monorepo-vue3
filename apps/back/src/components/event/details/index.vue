<script>
export default { name: '' };
</script>

<script setup>
import { useI18n } from 'vue-i18n';
import { Event } from '@dsp/business';

defineProps({
  event: { type: Event, required: true }
});

const { t } = useI18n();

const statusClass = bool => {
  if (!bool) return;
  return 'event-status--active';
};
</script>

<template>
  <div class="event-details">
    <dsp-surface as="section" class="event-details__dateEvent">
      <dsp-center>
        <h2>
          {{ t(`event.details.title.dateEvent`) }}
        </h2>
      </dsp-center>
      <dsp-flex class="card-container" justify="space-around" gap="sm">
        <dsp-flex direction="column" align="center" class="card">
          <h3>{{ t('event.details.title.digitalDeposit') }}</h3>
          <dsp-icon
            :class="statusClass(event.isDigitalPeriod)"
            size="xl"
            icon="calendar"
          />
          <p class="date">
            {{
              t('event.details.startEndAt', {
                startAt: event.formatDigitalSubmissionStartAt(),
                endAt: event.formatDigitalSubmissionEndAt()
              })
            }}
          </p>
        </dsp-flex>
        <dsp-flex direction="column" align="center" class="card">
          <h3>{{ t('event.details.title.physicalDeposit') }}</h3>
          <dsp-icon
            :class="statusClass(event.isPhysicalPeriod)"
            size="xl"
            icon="calendar"
          />
          <p class="date">
            {{
              t('event.details.startEndAt', {
                startAt: event.formatPhysicalSubmissionStartAt(),
                endAt: event.formatPhysicalSubmissionEndAt()
              })
            }}
          </p>
        </dsp-flex>
        <dsp-flex direction="column" align="center" class="card">
          <h3>{{ t('event.details.title.sale') }}</h3>
          <dsp-icon
            :class="statusClass(event.isSalesPeriod)"
            size="xl"
            icon="calendar"
          />
          <p class="date">
            {{
              t('event.details.startEndAt', {
                startAt: event.formatSalesStartAt(),
                endAt: event.formatSalesEndAt()
              })
            }}
          </p>
        </dsp-flex>
      </dsp-flex>
    </dsp-surface>
    <dsp-surface as="section" class="event-details__informations">
      <dsp-center>
        <h2>{{ t(`event.details.title.informations`) }}</h2>
      </dsp-center>
      <dl>
        <dt v-if="event.content">{{ t(`event.label.description`) }}</dt>
        <dd v-if="event.content">{{ event.content }}</dd>

        <dt>{{ t(`event.label.numArticles`) }}</dt>
        <dd>
          {{ event.numberOfItems || 0 }}
        </dd>

        <dt>{{ t(`event.label.numUserMarked`) }}</dt>
        <dd>
          {{ event.numberOfMarkedUser || 0 }}
        </dd>

        <dt v-if="event.location">{{ t(`event.label.location`) }}</dt>
        <dd v-if="event.location">
          <span>{{ event.location.name }}</span>
          <br />
          <span>{{ event.location.address.route }}</span>
          <br />
          <span>{{ event.location.address.postalCode + ' ' }}</span>
          <span>{{ event.location.address.city }}</span>
        </dd>
      </dl>
    </dsp-surface>
    <dsp-surface as="section" class="event-details__schedule">
      <dsp-center>
        <h2>{{ t(`event.details.title.schedule`) }}</h2>
      </dsp-center>
      <dl>
        <dt>{{ t(`event.details.day.monday`) }}</dt>
        <dd>{{ event.schedule.MONDAY }}</dd>

        <dt>{{ t(`event.details.day.tuesday`) }}</dt>
        <dd>{{ event.schedule.TUESDAY }}</dd>

        <dt>{{ t(`event.details.day.wednesday`) }}</dt>
        <dd>{{ event.schedule.WEDNESDAY }}</dd>

        <dt>{{ t(`event.details.day.thursday`) }}</dt>
        <dd>{{ event.schedule.THURSDAY }}</dd>

        <dt>{{ t(`event.details.day.friday`) }}</dt>
        <dd>{{ event.schedule.FRIDAY }}</dd>

        <dt>{{ t(`event.details.day.saturday`) }}</dt>
        <dd>{{ event.schedule.SATURDAY }}</dd>

        <dt>{{ t(`event.details.day.sunday`) }}</dt>
        <dd>{{ event.schedule.SUNDAY }}</dd>
      </dl>
    </dsp-surface>
  </div>
</template>

<style lang="scss" scoped>
.event-details {
  display: grid;
  grid-gap: var(--spacing-md);

  @include not-mobile {
    grid-template-columns: minmax(0, 7fr) 3fr;
    grid-template-areas:
      'dateEvent schedule'
      'informations schedule';
  }
}
.event-details__dateEvent {
  @include not-mobile {
    grid-area: dateEvent;
  }
}
.event-details__schedule {
  @include not-mobile {
    grid-area: schedule;
  }
}
.event-details__informations {
  @include not-mobile {
    grid-area: informations;
  }
}

dl {
  @include desktop-only {
    display: grid;
    grid-template-columns: minmax(7em, auto) minmax(10em, auto);
    grid-column-gap: var(--spacing-md);
  }

  > *:nth-child(odd) {
    font-weight: var(--font-weight-light);
  }
}

dd {
  margin-left: 0;
  margin-bottom: var(--spacing-sm);
}

.event-details__schedule dd {
  text-align: end;
}

h3 {
  font-size: var(--font-size-lg);
}

.card-container {
  @include not-mobile {
    flex-wrap: nowrap;
  }
}
.date {
  font-size: var(--font-size-sm);
}

.card {
  text-align: center;
}

.event-status--active {
  :deep(svg) {
    path {
      fill: var(--color-brand-600);
    }
  }
}
.info {
  margin-left: var(--spacing-sm);
}
</style>
