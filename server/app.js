const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// connect to the database
mongoose.connect('mongodb://root:2431996fkbask@ds225382.mlab.com:25382/grapql-tut', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('Connected to the database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});