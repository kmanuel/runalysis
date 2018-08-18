const graphql = require('graphql');
const TrackPointType = require('./trackpoint_type');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
} = graphql;

const RunType = new GraphQLObjectType({
  name: 'Run',
  fields: () => ({
    name: { type: GraphQLString },
    startTime: { type: GraphQLFloat },
    endTime: { type: GraphQLFloat },
    duration: { type: GraphQLInt },
    trackPoints: { type: GraphQLList(TrackPointType) },
    ascent: { type: GraphQLFloat },
    descent: { type: GraphQLFloat },
    heartRate: { type: GraphQLFloat },
    distance: { type: GraphQLFloat },
  }),
});

module.exports = RunType;
