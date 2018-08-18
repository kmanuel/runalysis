const path = require('path');
const graphql = require('graphql');
const RunType = require('./run_type');
const runLoader = require('../gpxParser/runLoader');
const fileLoader = require('../gpxParser/fileLoader');

const {
  GraphQLObjectType,
  GraphQLList,
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    runs: {
      type: GraphQLList(RunType),
      resolve() {
        const fileDir = path.resolve(__dirname, '../__test__/testfiles/');
        return fileLoader.getFilesRecursively(fileDir)
          .map(runLoader.loadRun);
      },
    },
  },
});

module.exports = RootQuery;
