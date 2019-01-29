const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

var books = [
    {name: 'Book1 name', genre: 'Fantasy', id: '1'},
    {name: '300', genre: 'Action', id: '2'},
    {name: '6th Sense', genre: 'Sci-Fi', id: '3'}
];

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        /**
         * Getting a Book with specific id
         * frontend calling: book(id: 'id_string') { fields to get }
         * @param {string} id - id of the book
         * @returns {Book}
         * */
        book: {
            type: BookType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                // code to get data from db / other source
                console.log('type: ' + typeof(args.id) + ' id: ' + args.id);
                return _.find(books, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});