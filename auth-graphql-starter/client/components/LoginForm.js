import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

class LoginForm extends Component {
	constructor(props) {
		super(props)

		this.state = { errors: [] }
	}

	componentWillUpdate(nextProps) {
		// this.props => the old, current set of props
		// nextProps => the next set of props that will be in place when the component rerenders

		// console.log(this.props, nextProps);
		// To get to this line of code, we logged both the original props AND the props after we login. We noticed
		// that the user property was null originally and THEN in nextProps it was a user object
		// Once we see that change has happened, we can redirect the user
		if(!this.props.data.user && nextProps.data.user) {
			// redirect to dashboard
			hashHistory.push('/dashboard');

		}
	}


	onSubmit({ email, password})  {
		this.props.mutate({
			variables: { email, password },
			refetchQueries: [{ query }]
		}).catch(res => { 
			const errors = res.graphQLErrors.map(error => error.message);
			this.setState({ errors });
		 });	
	}

	render() {
		return (
			<div>
				<h3>Login</h3>
				<AuthForm 
					errors={this.state.errors}
					onSubmit={this.onSubmit.bind(this)}/>
			</div>
		)
	}
}

export default graphql(query)(	
	graphql(mutation)(LoginForm)
);