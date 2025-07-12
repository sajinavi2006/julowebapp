const countFiles = require('count-files');
const match = require('anymatch');

let jsFiles;
let tsFiles;
let jsFilesCount;
let tsFilesCount;

const runCoverage = async () => {
  const allOpts = {
    ignore: function (file) {
      return match(['**/*.js'], file); // return true to ignore file
    },
    dereference: false,
  };

  jsFiles = new Promise((resolve, reject) => {
    countFiles('./src', allOpts, (_, results) => {
      if (results.error) {
        reject(results.error);
      } else {
        resolve(results.files);
      }
    });
  });

  const tsOpts = {
    ignore: function (file) {
      return match(['**/*.ts', '**/*.tsx', '**/*.js'], file); // return true to ignore file
    },
    dereference: false,
  };

  tsFiles = new Promise((resolve, reject) => {
    countFiles('./src', tsOpts, (_, results) => {
      if (results.error) {
        reject(results.error);
      } else {
        resolve(results.files);
      }
    });
  });

  try {
    const [jsFilesResult, tsFilesResult] = await Promise.all([ jsFiles, tsFiles ]);
    jsFilesCount = jsFilesResult
    tsFilesCount = jsFilesCount - tsFilesResult;

    if (!jsFilesCount) {
      console.log('There is an error, please re-run this command!');
      return;
    }

    const coverage = ((tsFilesCount / jsFilesCount) * 100).toFixed(2);
    console.log(`Typescript Coverage: ${coverage}%`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

runCoverage();
