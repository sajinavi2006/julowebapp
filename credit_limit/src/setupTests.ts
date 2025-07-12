import * as fs from 'fs';
import * as path from 'path';

import '@testing-library/jest-dom';

/**
 * Auto load file from __mocks__
 *
 * Note:
 *
 * Please only put mock inside __mocks__ that is globally used,
 * instead you can locally mock inside your .spec or .test
 */

const extensions = ['.ts', '.tsx'];

fs.readdirSync(path.join(__dirname, '__mocks__')).forEach((file) => {
  if (
    path.basename(file).includes('.mock') &&
    extensions.includes(path.extname(file))
  ) {
    const filePath = path.join(__dirname, '__mocks__', file);
    import(filePath);
  }
});
