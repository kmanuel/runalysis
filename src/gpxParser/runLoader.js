const { Run } = require('../models/Run');
const fileLoader = require('../gpxParser/fileLoader');

const loadRun = pathRoRun => fileLoader.readFile(pathRoRun)
  .then(gpxObj => new Run(gpxObj));


module.exports = { loadRun };
