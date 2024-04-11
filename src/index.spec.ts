import { PackageManager, checkLockfileUpdate, getPRTitle, checkPRFileSize } from './index';

declare const global: any;

describe('index', () => {
  beforeEach(() => {
    global.warn = jest.fn();
    global.message = jest.fn();
    global.fail = jest.fn();
    global.markdown = jest.fn();
  });

  afterEach(() => {
    global.warn = undefined;
    global.message = undefined;
    global.fail = undefined;
    global.markdown = undefined;
  });

  describe('getPRTitle()', () => {
    it('Checks for a that message has been called', () => {
      global.danger = {
        github: { pr: { title: 'My Test Title' } }
      };

      getPRTitle();

      expect(global.message).toHaveBeenCalledWith('PR Title: My Test Title');
    });
  });

  describe('checkLockfileUpdate()', () => {
    it('Sends a warning when NPM lockfile is not updated', () => {
      global.danger = {
        git: {
          fileMatch: jest
            .fn()
            .mockReturnValueOnce({ modified: true })
            .mockReturnValueOnce({ modified: false })
        }
      };

      checkLockfileUpdate(PackageManager.NPM);

      expect(global.warn).toHaveBeenCalledWith('You might have forgotten to run `npm install`');
    });

    it('Sends a warning when Yarn lockfile is not updated', () => {
      global.danger = {
        git: {
          fileMatch: jest
            .fn()
            .mockReturnValueOnce({ modified: true })
            .mockReturnValueOnce({ modified: false })
        }
      };

      checkLockfileUpdate(PackageManager.YARN);

      expect(global.warn).toHaveBeenCalledWith('You might have forgotten to run `yarn`');
    });

    it('Sends a warning when PNPM lockfile is not updated', () => {
      global.danger = {
        git: {
          fileMatch: jest.fn().mockReturnValueOnce({ modified: true })
        }
      };

      checkLockfileUpdate(PackageManager.PNPM);

      expect(global.warn).toHaveBeenCalledWith(
        'You might have forgotten to run your package installer'
      );
    });
  });

  describe('checkPRFileSize()', () => {
    it('Sends a warning when the PR file size goes over the specified limit', () => {
      global.danger = {
        git: {
          created_files: ['one', 'two', 'three', 'four'],
          modified_files: []
        }
      };

      checkPRFileSize(3);

      expect(global.warn).toHaveBeenCalledWith(
        'This PR has more changes than recommended. Please check that all changes are within scope.'
      );
    });
  });
});
