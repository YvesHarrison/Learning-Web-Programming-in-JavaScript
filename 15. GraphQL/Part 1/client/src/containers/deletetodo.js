import React from 'react';
import ApiService from '../ApiService';
import { Link } from 'react-router-dom';

class AddtoDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo_id:'',
            todo_list:[]
        };
    }

    async submitForm(e){
        e.preventDefault();
        //console.log(this.state.todo_id);
        await ApiService.deleteTodos({id: this.state.todo_id});
        // let newtodo = this.state.todo_list;
        // for(let i = 0; i < newtodo.length; ++i){
        //     if(newtodo[i] === this.state.todo_id){
        //         newtodo.slice(i,1);
        //         break;
        //     }
        // }
        // this.setState({todo_list: newtodo});
        window.location.replace("http://localhost:3000/deletetodo");
    }


    async componentDidMount(){
        //if(this.state.todo_list.length!==0)return;
        try {
            const todos = await ApiService.getTodos();
            this.setState({todo_list: todos});
            console.log(this.state.todo_list);
        } catch (e) {
            console.error(`An error ${e.message} occured while searching users`);
        }
    }
    //onChange={this.handleChange}
    display(){
        console.log(this.state.todo_list);
        if(this.state.todo_list.length === 0) return null;
        return this.state.todo_list.map(todo=>{
            return (<option key = {todo.id} value = {todo.id}>{todo.title}</option>)
        })
    }

    render() {
        return( <div className="Add" >
            <form id = "add-todo" onSubmit = {this.submitForm.bind(this)}>
                <div className = "field">
                    <label>Title</label>
                    <select name = "user" onChange={(e)=>this.setState({todo_id: e.target.value})}>
                        <option>Not Selected</option>
                        {this.display()}
                    </select>
                </div>

                <button>Delete</button>
            </form>
            <Link className="todo__linkback" to='/'>Back to Users search</Link>
        </div>);
    }


}

export default AddtoDo;

