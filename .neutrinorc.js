const airbnb = require('@neutrinojs/airbnb');
const reactComponents = require('@neutrinojs/react-components');
const jest = require('@neutrinojs/jest');

module.exports = {
  use: [
    airbnb(),
    reactComponents(),
    jest(),
    (neutrino) => {
      neutrino.register('styleguide', () => ({
        webpackConfig: neutrino.config.toConfig(),
      }));
    },
  ]
};
