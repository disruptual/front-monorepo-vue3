const clones = new WeakMap();

const isEmpty = el => [...el.childNodes].every(node => !node.textContent);
export const vLazyText = {
  mounted(el) {
    if (isEmpty(el)) {
      if (clones.get(el)) return;
      clones.set(el, document.createTextNode('\u200b'));
      el.parentNode.insertBefore(clones.get(el), el);
    } else {
      clones.get(el)?.remove();
      clones.delete(el);
    }
  },

  updated(el) {
    if (isEmpty(el)) {
      if (clones.get(el)) return;
      clones.set(el, document.createTextNode('\u200b'));
      el.parentNode.insertBefore(clones.get(el), el);
    } else {
      clones.get(el)?.remove();
      clones.delete(el);
    }
  }
};
