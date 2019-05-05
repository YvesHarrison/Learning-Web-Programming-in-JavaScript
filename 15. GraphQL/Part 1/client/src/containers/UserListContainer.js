import React from 'react';
import ApiService from '../ApiService';
import UserList from '../components/UserList';
import UserForm from '../forms/UserForm';
import { Link } from 'react-router-dom';

class UserListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
        this.search = this.search.bind(this);
    }
    
    async search(params) {
        try {
            const users = await ApiService.getUsers(params);
            this.setState({users});
        } catch (e) {
            console.error(`An error ${e.message} occured while searching users`);
        }
    }

    render() {
        return <div className="user">
            <UserForm submitHandler={this.search} />
            <Link className='add__todo-link' to={`/addtodo`}>Add Todo</Link>
            <Link className='update__todo-link' to={`/updatetodo`}>Update Todo</Link>
            <Link className='delete__todo-link' to={`/deletetodo`}>Delete Todo</Link>
            <UserList users={this.state.users} />
        </div>;
    }


}

export default UserListContainer;

