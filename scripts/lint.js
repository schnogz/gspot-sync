/* eslint no-console:0 import/no-extraneous-dependencies:0 */

const childProcessFork = require('child_process').fork;
const chalk = require('chalk');

// File patterns to lint
const patterns = ['*.js', 'config', 'scripts', 'src'];

// Animated "Linting" message
const frames = [...'⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'];
let i = 0;
const interval = setInterval(() => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`${frames[i]} ${chalk.bold('Linting...')} `);
  i = i >= frames.length - 1 ? 0 : i + 1;
}, 75);

// Execute lint in forked process (this allows us to animate stdout)
const lintExec = childProcessFork('./scripts/lint-exec');
lintExec.on('message', (result) => {
  clearInterval(interval); // Stop animation
  // Clear "Linting" message
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  // Display results (eslint report or success message)
  if (result[0].errorCount > 0 || result[0].warningCount > 0) {
    console.log(result[1]);
  } else {
    console.log(chalk.green('👌  No lint errors or warnings.'));
  }
  // Slight delay for nicer experience
  setTimeout(() => {
    process.exit();
  }, 100);
});

lintExec.send(patterns);
