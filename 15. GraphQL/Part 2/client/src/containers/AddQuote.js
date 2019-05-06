import React from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';

const addQuote = gql`
    mutation($input: QuoteCreateType!){
        createQuote(input: $input){
           id
           quote
        }
    }
`

class AddQuote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: '',
        };
    }
    
    
    async submitForm(e){
        e.preventDefault();
        //console.log(this.state);
        await this.props.addQuote({
            variables: {
                input: {quote: this.state.quote}
            }
        });
        window.location.replace("http://localhost:3000/AddQuote");
    }

    render() {
        return( <div className="Add" >
            <form id = "add-todo" onSubmit = {this.submitForm.bind(this)}>
                <div className = "field">
                    <label>Quote</label>
                    <input type = "text" name = "title" onChange = {(e)=>this.setState({quote: e.target.value})}/>
                </div>

                <button>Add</button>
            </form>
            <Link className="todo__linkback" to='/'>Back to View Quotes</Link>
        </div>);
    }
}

export default compose(graphql(addQuote,{name: "addQuote"}))(AddQuote);

