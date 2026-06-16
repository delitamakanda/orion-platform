import { execSync } from 'node:child_process';

const fastSteps = [
  'npx ng lint',
];

const fullOnlySteps = [
  'npx ng test --watch=false --browsers=ChromeHeadless --code-coverage',
  'npx ng build --configuration production',
];

// Runs the CI steps in order and stops at the first failing one.
// Returns a discriminated result instead of throwing so callers can map it
// to whatever their environment expects (exit code, JSON payload, ...).
export function runChecks({ full = false, capture = false } = {}) {
  const steps = full ? [...fastSteps, ...fullOnlySteps] : fastSteps;
  for (const step of steps) {
    try {
      execSync(step, capture ? { encoding: 'utf8' } : { stdio: 'inherit' });
    } catch (error) {
      const out = capture
        ? [error.stdout, error.stderr].filter(Boolean).join('\n').trim()
        : '';
      return {
        status: 'error',
        message: `Check failed: ${step}\n\n${out || error.message}`,
      };
    }
  }
  return { status: 'success' };
}
