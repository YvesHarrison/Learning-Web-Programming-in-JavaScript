import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class BerryList extends Component{
	constructor(props) {
      super(props);
      this.state = {
         data: undefined,
         pre: 0,
         loading: false
      };
	}

	async getLists(){
		try{
			let pageNum = this.props.match.params.page;
            if (!pageNum) {
                pageNum = 0;
            }
            pageNum *= 20;

            const response = await axios.get(
                `https://pokeapi.co/api/v2/berry/?offset=${pageNum}`
			);

            this.setState ({
         		data: response.data,
         		pre: pageNum/20,
         		loading: false
      		});
			console.log(response.data);
		}
		catch(e){
			console.log(e);
		}
	}

	componentDidMount() {
        this.getLists();
	}

	show(data){
		if(!data) return "No Data!";
		const list = data.results.map((o,i)=>{
			return <li key={i}><Link to={"/berries/" + o.url.split("/")[6]}>{o.name}</Link></li>
		});
		return (<ol>{list}</ol>);
	}

	render(){
		let body = null;
		let head= (
            <article>
                <h2>Berry List</h2>
                <ul>
                    <li><Link to="/pokemon/page/0">Pokemon List</Link></li>
                    <li><Link to="/berries/page/0">Berry List</Link></li>
                    <li><Link to="/machines/page/0">Machine List</Link></li>
                </ul>
            </article>
		);
		body = (
			<div className="App-body">
                {head} 
        		{this.show(this.state.data)}
			</div>
		);
		return body;
	}
}

export default BerryList;