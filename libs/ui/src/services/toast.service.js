import { ref } from 'vue';
import { makeRandomId, isString } from '@dsp/core';

export class ToastService {
  constructor() {
    this.toasts = ref([]);

    this._defaultOptions = {
      timeout: 5000
    };

    this.show = this.show.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.hide = this.hide.bind(this);
  }

  _addToast(toast) {
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
      if (index === -1) return;
      this.toasts.value.splice(index, 1);
    }, timeout);

    return normalizedToast;
  }

  show(toast, type) {
    if (isString(toast)) {
      toast = { message: toast };
    }

    return this._addToast({ ...toast, type: toast.type || type });
  }

  showSuccess(toast) {
    return this.show(toast, 'success');
  }

  showError(toast) {
    return this.show(toast, 'error');
  }

  hide(toastId) {
    this.toasts.value = this.toasts.value.filter(t => t.id !== toastId);
  }
}
