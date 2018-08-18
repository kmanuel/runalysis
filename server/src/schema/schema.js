const graphql = require('graphql');
const RootQuery = require('./root_query_type');

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: RootQuery,
});
