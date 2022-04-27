const defaults = {
  threshold: 50,
  passive: false
};

class Swiper {
  constructor(element, options = {}) {
    this.options = { ...defaults, ...options };

    this.element = null;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;

    this.onSwipe = this.options.onSwipe;

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.destroy = this.destroy.bind(this);
    this.handleGesture = this.handleGesture.bind(this);

    let eventOptions = { passive: true };

    this.element = element;

    this.element.addEventListener(
      'touchstart',
      this.onTouchStart,
      eventOptions
    );
    this.element.addEventListener('touchend', this.onTouchEnd, eventOptions);
  }

  onTouchStart(event) {
    this.touchStartX = event.changedTouches[0].screenX;
    this.touchStartY = event.changedTouches[0].screenY;
  }

  onTouchEnd(event) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.touchEndY = event.changedTouches[0].screenY;
    this.handleGesture();
  }

  destroy() {
    this.element.removeEventListener('touchstart', this.onTouchStart, {
      passive: true
    });
    this.element.removeEventListener('touchend', this.onTouchEnd, {
      passive: true
    });
  }

  handleGesture() {
    if (this.touchEndX + this.options.threshold <= this.touchStartX) {
      this.onSwipe({
        direction: 'left',
        offset: this.touchEndX - this.touchStartX
      });
    }
    if (this.touchEndX - this.options.threshold >= this.touchStartX) {
      this.onSwipe({
        direction: 'right',
        offset: this.touchEndX - this.touchStartX
      });
    }
    if (this.touchEndY + this.options.threshold <= this.touchStartY) {
      this.onSwipe({
        direction: 'up',
        offset: this.touchEndY - this.touchStartY
      });
    }
    if (this.touchEndY - this.options.threshold >= this.touchStartY) {
      this.onSwipe({
        direction: 'down',
        offset: this.touchEndY - this.touchStartY
      });
    }
  }
}

export const vOnSwipe = {
  mounted(el, { value: cb }) {
    new Swiper(el, { onSwipe: cb });
  }
};
