import React from 'react';
import './styles/style.css';
import UserListContainer from './containers/UserListContainer';
import TodoListContainer from './containers/TodoListContainer';
import AddtoDo from './containers/addtodo';
import { Route, Switch } from 'react-router-dom';

const App = () => {
    return <Switch>
        <Route exact path = '/' component = {UserListContainer}/>
        <Route path = '/todos/:userId' component = {TodoListContainer}/>
        <Route path = '/addtodo' component = {AddtoDo}/>
    </Switch>
};

export default App;
