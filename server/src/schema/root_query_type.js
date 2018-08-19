const path = require('path');
const graphql = require('graphql');
const atob = require('atob');
const RunType = require('./run_type');
const runLoader = require('../gpxParser/runLoader');
const fileLoader = require('../gpxParser/fileLoader');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} = graphql;

const loadRunById = id => runLoader.loadRun(atob(id));

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    runs: {
      type: GraphQLList(RunType),
      resolve() {
        const fileDir = path.resolve(__dirname, '../playground/files/');
        return fileLoader.getFilesRecursively(fileDir)
          .map(runLoader.loadRun)
          .reverse();
      },
    },
    run: {
      type: RunType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return loadRunById(args.id);
      },
    },
  },
});

module.exports = RootQuery;
