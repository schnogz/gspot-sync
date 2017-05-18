/* eslint strict:0 */

'use strict';

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  const raw = Object
    .keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => {
      const newEnv = env;
      newEnv[key] = process.env[key];
      return newEnv;
    }, {
      APP_ENV: process.env.APP_ENV || 'qa',
      NODE_ENV: process.env.NODE_ENV || 'development',
      PUBLIC_URL: publicUrl,
    });
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object
      .keys(raw)
      .reduce((env, key) => {
        const newEnv = env;
        newEnv[key] = JSON.stringify(raw[key]);
        return newEnv;
      }, {}),
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;
