import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import QuoteList from './containers/QuoteList';
import AddQuote from './containers/AddQuote';
import UpdateQuote from './containers/UpdateQuote';
import DeleteQuote from './containers/DeleteQuote';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

const client = new ApolloClient({
  uri:'http://localhost:3001/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client = {client}>
        <Router>
          <Route exact path = '/' component = {QuoteList}/>
          <Route path = '/AddQuote' component = {AddQuote}/>
          <Route path = '/UpdateQuote' component = {UpdateQuote}/>
          <Route path = '/DeleteQuote' component = {DeleteQuote}/>
      </Router>
      </ApolloProvider>
    );
  }
}



export default App;
