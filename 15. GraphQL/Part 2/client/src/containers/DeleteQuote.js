import React from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';

const getQuotesQuery = gql`
    {
        quotes{
            id
            quote
        }
    }
`

const deleteQuote = gql`
    mutation($input: QuoteDeleteType!){
        deleteQuote(input: $input){
           id
           quote
        }
    }
`

class DeleteQuote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote_id:''
        };
    }

    async submitForm(e){
        e.preventDefault();
        //console.log(this.state)
        await this.props.deleteQuote({
            variables: {
                input: {id: this.state.quote_id}
            }
        });
        window.location.replace("http://localhost:3000/DeleteQuote");
    }

    display(){
        let data = this.props.getQuotesQuery;
        if(data.loading){
            return (<option>Loading Quotes</option>);
        }
        else{
            return data.quotes.map(quote=>{
                return (
                    <option key = {quote.id} value = {quote.id}>{quote.quote}</option>
                );
            })
        }
    }

    render() {
        return( <div className="Add" >
            <form id = "add-todo" onSubmit = {this.submitForm.bind(this)}>
                <div className = "field">
                    <label>Quote</label>
                    <select name = "user" onChange={(e)=>this.setState({quote_id: e.target.value})}>
                        <option>Not Selected</option>
                        {this.display()}
                    </select>
                </div>

                <button>Delete</button>
            </form>
            <Link className="todo__linkback" to='/'>Back to View Quotes</Link>
        </div>);
    }


}

export default compose(
    graphql(deleteQuote, {name: "deleteQuote"}),
    graphql(getQuotesQuery, {name: "getQuotesQuery"})
)(DeleteQuote);

