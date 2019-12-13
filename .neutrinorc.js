const reactLint = require('@mozilla-frontend-infra/react-lint');
const reactComponents = require('@neutrinojs/react-components');
const jest = require('@neutrinojs/jest');

module.exports = {
  use: [
    reactLint(),
    reactComponents(),
    jest(),
    (neutrino) => {
      neutrino.register('styleguide', () => ({
        webpackConfig: neutrino.config.toConfig(),
        skipComponentsWithoutExample: true,
      }));
    },
  ]
};
