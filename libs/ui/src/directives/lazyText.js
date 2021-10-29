const clones = new WeakMap();

export const vLazyText = {
  mounted(el) {
    const childNodes = [...el.childNodes];
    if (childNodes.every(node => !node.textContent)) {
      if (clones.get(el)) return;
      clones.set(el, document.createTextNode('\u200b'));
      el.parentNode.insertBefore(clones.get(el), el);
    } else {
      clones.get(el)?.remove();
      clones.delete(el);
    }
  },

  updated(el) {
    const childNodes = [...el.childNodes];
    if (childNodes.every(node => !node.textContent)) {
      if (clones.get(el)) return;
      clones.set(el, document.createTextNode('\u200b'));
      el.parentNode.insertBefore(clones.get(el), el);
    } else {
      clones.get(el)?.remove();
      clones.delete(el);
    }
  }
};
