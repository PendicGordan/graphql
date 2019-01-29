const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

var books = [
    {name: 'Book1 name', genre: 'Fantasy', id: '1'},
    {name: '300', genre: 'Action', id: '2'},
    {name: '6th Sense', genre: 'Sci-Fi', id: '3'}
];

var authors = [
    {name: 'John', age: 44, id: '1'},
    {name: 'Mike', age: 33, id: '2'},
    {name: 'Tom', age: 66, id: '3'}
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
        },
        /**
         * Getting an Author with specific id
         * frontend calling: author(id: 'id_string') { fields to get }
         * @param {string} id - id of the author
         * @returns {Author}
         * */
        author: {
            type: AuthorType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                // code to get data from db / other source
                console.log('type: ' + typeof(args.id) + ' id: ' + args.id);
                return _.find(authors, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});