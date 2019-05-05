import React from 'react';
import ApiService from '../ApiService';
import { Link } from 'react-router-dom';

class AddtoDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description:'',
            completed:false,
            user_id:'',
            user_list:[]
        };
    }
    
    
    submitForm(e){
        e.preventDefault();
        let new_todo ={
            title: this.state.title,
            description: this.state.description,
            completed: false,
            user_id: this.state.user_id
        }
        console.log(new_todo);
        ApiService.addTodos({title: new_todo.title, userId: Number(new_todo.user_id), description: new_todo.description});
    }


    async componentDidMount(){
        if(this.state.user_list.length!==0)return;
        try {
            const users = await ApiService.getUsers();
            this.setState({user_list: users});
            //console.log(this.state.user_list);
        } catch (e) {
            console.error(`An error ${e.message} occured while searching users`);
        }
    }
    //onChange={this.handleChange}
    display(){
        console.log(this.state.user_list);
        if(this.state.user_list.length === 0) return null;
        return this.state.user_list.map(user=>{
              return (<option key = {user.id} value = {user.id}>{user.first_name+" "+user.last_name}</option>)
        })
    }

    render() {
        return( <div className="Add" >
            <form id = "add-todo" onSubmit = {this.submitForm.bind(this)}>
                <div className = "field">
                    <label>Title</label>
                    <input type = "text" name = "title" onChange = {(e)=>this.setState({title: e.target.value})}/>
                </div>
                <div className = "field">
                    <label>Description</label>
                    <input type = "text" name = "description" onChange = {(e)=>this.setState({description: e.target.value})}/>
                </div>
                <div className = "field">
                    <label>User</label>
                    <select name = "user" onChange = {(e)=>this.setState({user_id: e.target.value})}>
                        <option>Not Selected</option>
                        {this.display()}
                    </select>
                </div>

                <button>Add</button>
            </form>
            <Link className="todo__linkback" to='/'>Back to Users search</Link>
        </div>);
    }


}

export default AddtoDo;

