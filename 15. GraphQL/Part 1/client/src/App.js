import React from 'react';
import './styles/style.css';
import UserListContainer from './containers/UserListContainer';
import TodoListContainer from './containers/TodoListContainer';
import AddtoDo from './containers/addtodo';
import UpdatetoDo from './containers/updatetodo';
import DeletetoDo from './containers/deletetodo';
import { Route, Switch } from 'react-router-dom';

const App = () => {
    return <Switch>
        <Route exact path = '/' component = {UserListContainer}/>
        <Route path = '/todos/:userId' component = {TodoListContainer}/>
        <Route path = '/addtodo' component = {AddtoDo}/>
        <Route path = '/Updatetodo' component = {UpdatetoDo}/>
        <Route path = '/Deletetodo' component = {DeletetoDo}/>
    </Switch>
};

export default App;
