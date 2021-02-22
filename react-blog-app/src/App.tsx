import { ApolloProvider } from '@apollo/client'
import './App.css';
import client from './utils/apollo-client';
import Home from './components/Home';

function App() {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}

export default App;
