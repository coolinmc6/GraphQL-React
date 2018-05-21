- Basics:

```graphql

// Unnamed Query
{
  company(id: "2") {
    id
    name
    users {
      id
      firstName
    }
  }
}

```

```
// Named Query
query findCompany {
  company(id: "2") {
    id
    name
    users {
      id
      firstName
    }
  }
}

```

- Multiple keys:

```js
{
  apple: company(id: "1") {
    id
    name
    users {
      id
      firstName
    }
  }
  google: company(id: "2") {
    id
    name
    users {
      id
      firstName
    }
  }
}
```

- Fragments

```js
{
  apple: company(id: "1") {
    ...companyDetails
  }
  google: company(id: "2") {
    ...companyDetails
  }
}

fragment companyDetails on Company{
  id
  name
  description
}
```

- Mutations are used to edit our data
- Executing a Mutation

```js
mutation {
  addUser(firstName: "Casey", age: 31) {
    id
    firstName
    age
  }
}

```