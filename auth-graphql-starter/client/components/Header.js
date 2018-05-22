import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

// import React, { Component } from 'react';
// import { graphql } from 'react-apollo';
// import { Link } from 'react-router';
// import query from '../queries/CurrentUser';
// import mutation from '../mutations/Logout';


// // ctr + e to use text expanding in JSX


class Header extends Component  {

	onLogoutClick() {
		this.props.mutate({
			refetchQueries: [{ query }]		// query is what we imported above and then ES6 to shorten it
		})
	}

	renderButtons() {
		const { loading, user } = this.props.data

		if(loading) { return <div />; }

		if(user) {
			return (
				<li>
					<a onClick={this.onLogoutClick.bind(this)}>Logout</a>
				</li>
			)
		} else {
			return (
				<div>
					<li>
						<Link to="/signup">Sign Up</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
					
				</div>
			)
		}

	}

	render() {
		
		return (
			<nav>
				<div className="nav-wrapper">
					<Link to="/" className="brand-logo left">Home</Link>
					<ul className="right">
						{this.renderButtons()}
					</ul>
				</div>
			</nav>
		)
	}
}


export default graphql(mutation)(
	graphql(query)(Header)
);