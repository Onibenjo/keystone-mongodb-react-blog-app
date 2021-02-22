import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
//   uri: 'https://48p1r2roz4.sse.codesandbox.io',
  uri: 'http://localhost:5000/admin/api',
  cache: new InMemoryCache()
})

export default client