const path = require('path');
const graphql = require('graphql');
const runLoader = require('../gpxParser/runLoader');
const fileLoader = require('../gpxParser/fileLoader');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLList,
} = graphql;

const TrackPointType = new GraphQLObjectType({
  name: 'TrackPoint',
  fields: () => ({
    lat: { type: GraphQLFloat },
    lon: { type: GraphQLFloat },
    elevation: { type: GraphQLFloat },
    time: { type: GraphQLFloat },
  }),
});

const RunType = new GraphQLObjectType({
  name: 'Run',
  fields: () => ({
    name: { type: GraphQLString },
    startTime: { type: GraphQLFloat },
    endTime: { type: GraphQLFloat },
    duration: { type: GraphQLInt },
    trackPoints: { type: GraphQLList(TrackPointType) },
  }),
});

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

module.exports = new GraphQLSchema({
  query: RootQuery,
});
