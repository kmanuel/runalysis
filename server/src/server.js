const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const PORT = 4000;

const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
