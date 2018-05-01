// contains all the knowledge required to tell GraphQL what your app's data looks like
const graphql = require('graphql');
// const _ = require('lodash');
const axios = require('axios');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema

} = graphql;

const UserType = new GraphQLObjectType({
	name: 'User', 
	fields: {
		id:  {type: GraphQLString},
		firstName: {type: GraphQLString},
		age: {type: GraphQLInt}
	}
});


const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: {id: { type: GraphQLString} },
			resolve(parentValue, args) {
				// resolve function is where we go into our database and find the data we're looking for
				// we just need to make sure to return a raw JS object or JSON
				// return _.find(users, { id: args.id }); => used for static data
				return axios.get(`http://localhost:3000/users/${args.id}`)
					.then(resp => resp.data);
			}
		}
	}
});



module.exports = new GraphQLSchema({
	query: RootQuery
})