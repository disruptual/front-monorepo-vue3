export const getBreakpoints = () => {
  const rootStyle = window.getComputedStyle(document.documentElement);
  const mobile = rootStyle.getPropertyValue('--breakpoint-mobile');
  const tablet = rootStyle.getPropertyValue('--breakpoint-tablet');

  return {
    mobile,
    tablet
  };
};
