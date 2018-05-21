# GraphQL with React

[https://github.com/StephenGrider/GraphQLCasts](https://github.com/StephenGrider/GraphQLCasts)

`npm install --save express express-graphql graphql lodash`

## Users

```sh
npm run dev
npm run json:server
```

In a browser: `http://localhost:4000/graphql`
**Query Syntax**



## Lyrical

- `npm run dev`
- update server.js file with username and password: 

`const MONGO_URI = 'mongodb://<username>:<password>@ds119650.mlab.com:19650/lyricaldb-cm';`


## Auth

### Adding Apollo to Project

```js
import ApolloClient from 'apollo-client';         // import ApolloClient
import { ApolloProvider } from 'react-apollo';    // import Apollo Provier

const client = new ApolloClient({                 // create new client
  dataIdFromObject: o => o.id                     // this allows Apollo to id all data
});

const Root = () => {
  return (
    <ApolloProvider client={client} >             // Wrap div in ApolloProvider
      <div>
        Auth Starter
      </div>
    </ApolloProvider>
  );
};
```

### Creating a GraphQL Query

```js
// NOTE: This is in a separate file (CurrentUser.js) in a separate directory (./client/queries)
import gql from 'graphql-tag';                    // import graphql-tag

                                                  // write the query and export it
export default gql`                               
{
  user {
    id
    email
  }
}
`;
```

### Add Query to React Component

**BEFORE:**

```babel
import React, { Component } from 'react';

class Header extends Component  {
  render() {
    return (
      <div>


      </div>
    );
  }
}


export default Header;
```

```babel
import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';

class Header extends Component  {
  render() {
    console.log(this.props.data);             // the result of the query is always on this.props.data
    return (
      <div>
      Header
      </div>
    )
  }
}


export default graphql(query)(Header);
```



