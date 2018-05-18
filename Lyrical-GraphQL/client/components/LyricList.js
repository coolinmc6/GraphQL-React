import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

/*
You can build the optimisticResponse by looking at the network requests from the mutation
that you are running. You can see the response you get back and largely copy what's there.

*/
class LyricList extends Component {
	onLike(id, likes) {
		this.props.mutate({ 
			variables: { id },
			optimisticResponse: {
				__typename: "Mutation",
				likeLyric: {
					id, 
					__typename: 'LyricType',
					likes: likes + 1
				}
			}
		})
	}
	renderLyrics() {
		return this.props.lyrics.map(({ id, content, likes }) => {
			return (
				<li key={id} className="collection-item">
					{content}
					<div className="vote-box">
						<i className="material-icons"
							onClick={() => this.onLike(id, likes)}
						>thumb_up</i> { likes }
					</div>
				</li>
			)
		})
	}
	render() {
		return (
			<ul className="collection">
				{this.renderLyrics()}
			</ul>
		)
	}
}

const mutation = gql`
	mutation LikeLyric($id:ID) {
	  likeLyric(id:$id) {
	    id
	    likes
	  }
	}
`

export default graphql(mutation)(LyricList);