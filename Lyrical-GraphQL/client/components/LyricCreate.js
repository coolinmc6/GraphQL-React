import React, { Component } from 'react';
// gql => allows us to write GraphQL queries in our JavaScript
import gql from 'graphql-tag';
// graphql => allows us to take a query and combine it with our component
import { graphql } from 'react-apollo';


class LyricCreate extends Component {
	constructor(props) {
		super(props)

		this.state = { content: ''};
	}

	onSubmit(event) {
		event.preventDefault();

		this.props.mutate({
			variables: {
				content: this.state.content,
				songId: this.props.songId
			}
		}).then(() => this.setState({ content: ''}))
	}

	render() {
		return (
			<form onSubmit={this.onSubmit.bind(this)}>
				<label>Add a Lyric</label>
				<input value={this.state.content}
						onChange={e => this.setState({ content: e.target.value })}	/>
			</form>
		);
	}
}

const mutation = gql`
mutation AddLyricToSong($content: String, $songId:ID) {
  addLyricToSong(content: $content, songId:$songId) {
    id
    lyrics {
    	id
    	content
    	likes
    }
  }
}
`;

// by doing this, we get access to this.props.mutate
export default graphql(mutation)(LyricCreate);