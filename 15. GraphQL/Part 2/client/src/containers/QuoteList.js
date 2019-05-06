import React from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getQuotesQuery = gql`
    {
        quotes{
            id
            quote
        }
    }
`

class QuoteList extends React.Component {
    displayQuote(){
        let data = this.props.data;
        if(data.loading){
            return (<div>Loading Quotes</div>);
        }
        else{
            return data.quotes.map(quote=>{
                return (
                    <li key = {quote.id}> id: {quote.id}  quote: {quote.quote}</li>
                );
            })
        }
    }

    render () {
        //console.log("aa",this.props);
        return (
           <div className="todo">
                <h1>View Quotes</h1>
                {this.displayQuote()}
                <Link className="AddQuote__linkback" to='/AddQuote'>Add Quote</Link>
                <h1> </h1>
                <Link className="UpdateQuote__linkback" to='/UpdateQuote'>Update Quote</Link>
                <h1> </h1>
                <Link className="DeleteQuote__linkback" to='/DeleteQuote'>Delete Quote</Link>
                <h1> </h1>
           </div>
        );
    }

}

export default graphql(getQuotesQuery)(QuoteList);


