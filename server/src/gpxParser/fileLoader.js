const fs = require('fs');
const xml2js = require('xml2js');

const isDirectory = path => fs.statSync(path).isDirectory();

const getFilesIn = path => fs.readdirSync(path);

const getFilesRecursively = (path) => {
  const toFullPath = fileName => `${path}/${fileName}`;
  try {
    const filesInPath = getFilesIn(path);
    const fullPaths = filesInPath.map(toFullPath);
    const allFiles = [];
    fullPaths.forEach((filePath) => {
      if (isDirectory(filePath)) {
        allFiles.push(...getFilesRecursively(filePath));
      } else {
        allFiles.push(filePath);
      }
    });
    return allFiles.filter(f => f.endsWith('.gpx'));
  } catch (ex) {
    return [];
  }
};

const readFile = path => new Promise((resolve, reject) => {
  const parser = new xml2js.Parser();
  parser.parseString(fs.readFileSync(path, 'UTF-8'), (err, res) => {
    if (err) {
      return reject(err);
    }
    return resolve({
      res,
      path,

    });
  });
});

module.exports = {
  getFilesRecursively,
  readFile,
};
