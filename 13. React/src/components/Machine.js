import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Machine extends Component{
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
                `https://pokeapi.co/api/v2/machine/${id}`
			);

            this.setState ({
         		data: response.data,
         		loading: false
      		});
			
		}
		catch(e){
			console.log(e);
		}
	}

	componentDidMount() {
        this.getBerry();
	}

	show(data){
		if(!data) return "No Data!";
		return (<article><h2>Machine ID: {this.props.match.params.id}</h2>
				<h3>Item: {data.item.name}</h3>
				<h3>Move: {data.move.name}</h3>
				<h3>Version Group: {data.version_group.name}</h3>
			</article>);
	}

	pagination(){

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

export default Machine;