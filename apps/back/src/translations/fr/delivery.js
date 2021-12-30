import { DELIVERY_MODES } from '@dsp/business';

export default {
  delivery: {
    modes: {
      [DELIVERY_MODES.MONDIAL_RELAY]: 'Mondial Relay',
      [DELIVERY_MODES.COLISSIMO]: 'Colissimo',
      [DELIVERY_MODES.HAND]: 'Remise en main propre',
      [DELIVERY_MODES.LOCATION]: 'Remise en magasin',
      [DELIVERY_MODES.RELAIS_COLIS]: 'Relais Colis',
      [DELIVERY_MODES.COCOLIS]: 'Cocolis',
      [DELIVERY_MODES.LAPOSTE_COLISSIMO]: 'Colissimo',
      [DELIVERY_MODES.LAPOSTE_LETTER]: 'Lettre suivie'
    }
  }
};
