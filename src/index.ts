// Provides dev-time type structures for  `danger` - doesn't affect runtime.
import { DangerDSLType } from '../node_modules/danger/distribution/dsl/DangerDSL';

export enum PackageManager {
  NPM = 'npm',
  YARN = 'yarn',
  PNPM = 'pnpm'
}

declare const danger: DangerDSLType;
export declare function message(message: string): void;
export declare function warn(message: string): void;
export declare function fail(message: string): void;
export declare function markdown(message: string): void;

export function getPRTitle() {
  const title = danger.github.pr.title;
  message(`PR Title: ${title}`);
}

export function checkLockfileUpdate(packageManager: PackageManager) {
  const hasPackageChanges = danger.git.fileMatch('package.json').modified;
  let hasLockfileChanges: boolean;
  let message = 'You might have forgotten to run your package installer';

  switch (packageManager) {
    case PackageManager.NPM: {
      hasLockfileChanges = danger.git.fileMatch('package-lock.json').modified;
      message = 'You might have forgotten to run `npm install`';
      break;
    }
    case PackageManager.YARN: {
      hasLockfileChanges = danger.git.fileMatch('yarn.lock').modified;
      message = 'You might have forgotten to run `yarn`';
      break;
    }
    case PackageManager.PNPM: {
      hasLockfileChanges = false;
      break;
    }
  }

  if (hasPackageChanges && !hasLockfileChanges) {
    warn(message);
  }
}

export default {
  getPRTitle,
  checkLockfileUpdate
};
