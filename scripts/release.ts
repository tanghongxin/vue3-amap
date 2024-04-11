/* eslint-disable no-console */
import { inc, valid, gt } from 'semver';
import inquirer, { QuestionCollection } from 'inquirer';
import { getVersion, updateVersion } from './pkg';
import { run } from './utils';

async function main(): Promise<void> {
  try {
    const branch = run('git rev-parse --abbrev-ref HEAD');
    if (branch !== 'main') throw new Error('Please use the main branch.');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  try {
    run('git diff-index --quiet HEAD');
  } catch {
    console.error('Please make sure your git status is clean and then retry.');
    process.exit(1);
  }

  run('pnpm lint');
  run('pnpm test');

  const newVersionInput = await inquirer.prompt({
    type: 'input',
    name: 'version',
    message: 'Please enter the new version (or leave it blank for options):',
  });

  let newVersion: string;

  if (newVersionInput.version) {
    if (!valid(newVersionInput.version) || !gt(newVersionInput.version, getVersion())) {
      console.error('Invalid version or version is not greater than the current version.');
      process.exit(1);
    }
    newVersion = newVersionInput.version;
  } else {
    const options = ['major', 'minor', 'patch'];
    const defaultOptionIndex = 2;
    const prompt: QuestionCollection<any> = {
      type: 'list',
      name: 'versionIncrement',
      message: 'Please select the version increment:',
      choices: options,
      default: defaultOptionIndex,
    };

    const { versionIncrement } = await inquirer.prompt(prompt);
    newVersion = inc(getVersion(), versionIncrement as 'major' | 'minor' | 'patch')!;
  }

  updateVersion(newVersion);
  run('git stage .');
  run(`git commit -m ':bookmark: release v${newVersion}'`);
  run(`git tag v${newVersion}`);
  run('git push');
  run('git push --tags');
  run('pnpm package');
  run('pnpm publish --access public');

  process.exit(0);
}

main();
