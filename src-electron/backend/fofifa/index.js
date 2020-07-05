/* eslint-disable @typescript-eslint/no-unused-vars */
const express = require('express');
const graphqlHTTP = require('express-graphql');

const db = require('./helpers/db');
const typeDefs = require('./scemas/schemas');
const model = require('./models/models');
const resolvers = require('./resolvers/index');
const graphqlTools = require('graphql-tools');
const loggingMiddleware = require('./middlewares/login');
const cors = require('cors');
const apps = express();
apps.use(cors());

const schema = graphqlTools.makeExecutableSchema({
  typeDefs,
  resolvers
});

apps.use(loggingMiddleware);

apps.use(
  '/api',
  graphqlHTTP((request, response, graphQLParams) => ({
    schema: schema,
    graphiql: true,
    context: {
      req: request,
      database: db,
      model: model
    }
  }))
);

process.on('message', ({ port }) => {
  console.log('****************   ', port);
  apps.listen(port, () => {
    process.send({
      message:
        '🚀 server started on port 1200, the api is available at http://127.0.0.1:' +
        port +
        '/api'
    });
  });
});
