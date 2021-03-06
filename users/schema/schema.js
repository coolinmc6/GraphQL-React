// contains all the knowledge required to tell GraphQL what your app's data looks like
const graphql = require('graphql');
// const _ = require('lodash');
const axios = require('axios');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull

} = graphql;

const CompanyType = new GraphQLObjectType({
	name: 'Company', 
	fields: () => ({
		id: { type: GraphQLString},
		name: { type: GraphQLString},
		description: { type: GraphQLString},
		users: {
			type: new GraphQLList(UserType),
			resolve(parentValue, args) {
				return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
					.then(res => res.data);
			}
		}
	})
});

const UserType = new GraphQLObjectType({
	name: 'User', 
	fields: () => ({
		id:  {type: GraphQLString},
		firstName: {type: GraphQLString},
		age: {type: GraphQLInt},
		company: {
			type: CompanyType,
			resolve(parentValue, args) {
				return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
					.then(res =>res.data);
			}
		}
	})
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
		},
		company: {
			type: CompanyType,
			args: { id: {type: GraphQLString}},
			resolve(parentValue, args) {

				return axios.get(`http://localhost:3000/companies/${args.id}`)
					.then(resp => resp.data);
			}
		}
	}
});

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addUser: {	// 'addUser' is the name of the mutation
			type: UserType,
			args: {
				firstName: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
				companyId: {type: GraphQLString }
			},
			resolve(parentValue, {firstName, age }) {
				return axios.post('http://localhost:3000/users', {firstName, age})
					.then(res => res.data)
			}
		},
		deleteUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			// you can also destructure args and peel off the id field { id }
			resolve(parentValue, args) {
				return axios.delete(`http://localhost:3000/users/${args.id}`)
					.then(res => res.data)
			}
		},
		editUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString)},
				firstName: { type: GraphQLString},
				age: { type: GraphQLInt},
				companyId: { type: GraphQLString}
			},

			resolve(parentValue, args) {
				return axios.patch(`http://localhost:3000/users/${args.id}`, args)
					.then(res => res.data)
			}
		}
	}
})



module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation
})