/* eslint import/no-extraneous-dependencies:0 */

const CLIEngine = require('eslint').CLIEngine;

const cli = new CLIEngine();

process.on('message', (patterns) => {
  const report = cli.executeOnFiles(patterns);
  process.send([report, cli.getFormatter()(report.results)]);
});
