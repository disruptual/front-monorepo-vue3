import { BaseModel } from './Base.model';
import { ORDER_DELAYS } from '../enums/order.enums';
import { format, addHours } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
export class DeliveryStateHisto extends BaseModel {
  get state() {
    return this.deliveryState;
  }

  get transition() {
    return this.deliveryTransition;
  }

  get status() {
    return this.transition ?? this.state;
  }

  isRollbackable(order) {
    if (
      order.isEnded ||
      order.hasProblem ||
      order.history.some(histo => histo.hasProblem) ||
      order.history.some(histo => histo.isEnded)
    ) {
      return false;
    }

    return true;
  }

  getMaxDate(delivery) {
    const delayInHours = ORDER_DELAYS[delivery.tag][this.state] || 0;
    const maxDate = addHours(new Date(this.createdAt), delayInHours);
    return format(maxDate, 'dd/MM/yy à HH:mm', {
      locale: frLocale
    });
  }
}
