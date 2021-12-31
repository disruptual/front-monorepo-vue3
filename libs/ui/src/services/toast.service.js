import { ref } from 'vue';
import { makeRandomId, isString } from '@dsp/core';

export class ToastService {
  constructor() {
    this.toasts = ref([]);

    this._defaultOptions = {
      timeout: 3000
    };
  }

  _showToast(toast) {
    if (isString(toast)) {
      toast = { message: toast };
    }

    const { timeout, ...normalizedToast } = {
      id: makeRandomId(4),
      ...this._defaultOptions,
      ...toast
    };

    this.toasts.value.push(normalizedToast);

    setTimeout(() => {
      const index = this.toasts.value.indexOf(normalizedToast);
      this.toasts.value.splice(index, 1);
    }, timeout);
  }

  showSuccess(toast) {
    if (isString(toast)) {
      toast = { message: toast };
    }

    return this._showToast({ ...toast, type: 'success' });
  }

  showError(toast) {
    if (isString(toast)) {
      toast = { message: toast };
    }

    return this._showToast({ ...toast, type: 'error' });
  }
}
