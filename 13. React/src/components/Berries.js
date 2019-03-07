import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Berries extends Component{
	constructor(props) {
      super(props);
      this.state = {
         data: undefined,
         loading: false
      };
	}

	async getBerry(){
		try{
			let id = this.props.match.params.id;
            
            const response = await axios.get(
                `https://pokeapi.co/api/v2/berry/${id}`
			);

            console.log(response.data);
            this.setState ({
         		data: response.data,
         		loading: false
      		});
			
		}
		catch(e){
			console.log(e);
			window.location.replace("http://localhost:3000/nomatch");
		}
	}

	componentDidMount() {
        this.getBerry();
	}

	show(data){
		if(!data) return "No Data!";
		return (<article><h2>{data.name}</h2>
				<h3>Size: {data.size}</h3>
				<h3>Natural Gift Power: {data.natural_gift_power}</h3>
			</article>);
	}

	render(){
		let body = null;
		let head= (
            <article>
                <h2>Pokemon List</h2>
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

export default Berries;