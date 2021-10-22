export const getFocusableChildren = node =>
  node
    ? node.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    : [];
