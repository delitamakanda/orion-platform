import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('node:child_process', () => ({ execSync: vi.fn() }));

import { execSync } from 'node:child_process';

import { runChecks } from './ci-checks.mjs';

const execSyncMock = vi.mocked(execSync);

function execFailure({ stdout = '', stderr = '' }) {
  return Object.assign(new Error('Command failed'), { stdout, stderr });
}

describe('runChecks', () => {
  beforeEach(() => {
    execSyncMock.mockReset();
  });

  it('runs the three fast steps and succeeds when all pass', () => {
    execSyncMock.mockReturnValue('ok');

    expect(runChecks()).toEqual({ status: 'success' });
    expect(execSyncMock).toHaveBeenCalledTimes(3);
  });

  it('runs the fast steps plus the full-only steps in full mode', () => {
    execSyncMock.mockReturnValue('ok');

    expect(runChecks({ full: true })).toEqual({ status: 'success' });
    expect(execSyncMock).toHaveBeenCalledTimes(5);
  });
});
