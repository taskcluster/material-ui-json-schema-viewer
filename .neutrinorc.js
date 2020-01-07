const reactLint = require('@mozilla-frontend-infra/react-lint');
const reactComponents = require('@neutrinojs/react-components');
const jest = require('@neutrinojs/jest');

module.exports = {
  use: [
    reactLint({
      rules: {
        'no-use-before-define': ['error', { 
          /**
           * Ignores reference to functions used before the function declaration. 
           * Since function declarations are hoisted, this is considered safe.
           */
          functions: false,
        }],
        'import/prefer-default-export': ['off'],
      },
    }),
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
