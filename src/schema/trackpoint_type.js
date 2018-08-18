const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLFloat,
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

module.exports = TrackPointType;
