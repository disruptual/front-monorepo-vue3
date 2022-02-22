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
    this.element.removeEventListener('touchstart', this.onTouchStart);
    this.element.removeEventListener('touchend', this.onTouchEnd);
  }

  handleGesture() {
    if (this.touchEndX + this.options.threshold <= this.touchStartX) {
      this.onSwipe({ direction: 'left' });
    }
    if (this.touchEndX - this.options.threshold >= this.touchStartX) {
      this.onSwipeRightAgent && this.onSwipeRightAgent();
      this.onSwipe({ direction: 'right' });
    }
    if (this.touchEndY + this.options.threshold <= this.touchStartY) {
      this.onSwipeUpAgent && this.onSwipeUpAgent();
      this.onSwipe({ direction: 'up' });
    }
    if (this.touchEndY - this.options.threshold >= this.touchStartY) {
      this.onSwipeDownAgent && this.onSwipeDownAgent();
      this.onSwipe({ direction: 'down ' });
    }
  }
}

export const vOnSwipe = {
  mounted(el, { value: cb }) {
    new Swiper(el, { onSwipe: cb });
  }
};
