import { PackageManager, checkLockfileUpdate, getPRTitle } from './index';

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
  });
});
