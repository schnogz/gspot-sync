/* eslint import/no-extraneous-dependencies:0 */

const CLIEngine = require('eslint').CLIEngine;

const cli = new CLIEngine({
  cache: true,
  fix: true
});

process.on('message', (patterns) => {
  const report = cli.executeOnFiles(patterns);
  // output fixes to disk
  CLIEngine.outputFixes(report);

  process.send([report, cli.getFormatter()(report.results)]);
});
