const fg = require('fast-glob');
const camelCase = require('camelcase');

const components = fg
  .sync('src/components/**/index.md')
  .map(path =>
    path
      .replace('src/components', '')
      .replace('index.md', '')
      .split('/')
      .filter(Boolean)
  )
  .filter(tokens => tokens.length > 0);

function addSidebarEntry(
  sidebar,
  [component, ...subComponents],
  pathPrefix = '/components/'
) {
  const camelCased = camelCase(component);
  const formatedName = camelCased.charAt(0).toUpperCase() + camelCased.slice(1);

  const entry = sidebar.find(entry => entry.text === formatedName);
  if (entry) {
    if (!entry.children) entry.children = [];
    if (subComponents.length > 0) {
      addSidebarEntry(
        entry.children,
        subComponents,
        `${pathPrefix}${component}/`
      );
    }
  } else {
    sidebar.push({
      text: formatedName,
      link: `${pathPrefix}${component}/`
    });
  }
}
let sidebarComponents = [];
components.forEach(component => {
  addSidebarEntry(sidebarComponents, component);
});

module.exports = {
  title: '@dsp/ui',
  description: 'Documentation for the @dsp/ui library.',
  themeConfig: {
    sidebar: [
      {
        text: 'Components',
        link: '/components/',
        collapsable: true,
        children: sidebarComponents
      }
    ]
  }
};
