import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class PokeList extends Component{
	constructor(props) {
      super(props);
      this.state = {
         data: undefined,
         pre: 0,
         loading: false
      };
	}

	async getLists() {
		try{
			let pageNum = Number(this.props.match.params.page);
            if (!pageNum) {
                pageNum = 0;
            }
            pageNum *= 20;

            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/?offset=${pageNum}`
			);

            this.setState ({
         		data: response.data,
         		pre: pageNum/20,
         		loading: false
      		});
			//console.log(response.data);
		}
		catch(e){
			console.log(e);
		}
	}

	componentDidMount() {
        this.getLists();
	}

	// componentWillReceiveProps(nextProps){
	// 	console.log(nextProps.match.params.page,this.state.pre);
 //    	if(Number(nextProps.match.params.page)!==this.state.pre){
 //    		console.log("hhh");
 //    		this.getLists();
 //    	}
 //    	else return;
	// }

	componentDidUpdate() {
        this.getLists();
	}
	

	show(data){
		if(!data) return "No Data!";
		//console.log("show",this.props.match.params.page);
		const list = data.results.map((o,i)=>{
			return <li key={i}><Link to={"/pokemon/" + o.url.split("/")[6]}>{o.name}</Link></li>
		});
		return (<ol>{list}</ol>);
	}

	pagination(){
		let pageNum = Number(this.props.match.params.page);

		let next = pageNum + 1;
		let pre = pageNum - 1;
		if(pageNum===0){

			return (<li><Link to={"/pokemon/page/" + next}>Next</Link></li>);
		}
		else{
			return (<ul>
						<li><Link to={"/pokemon/page/" + pre}>Previous</Link></li>
						<li><Link to={"/pokemon/page/" + next}>Next</Link></li>
					</ul>
			);
		}
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
                {this.pagination()}
        		{this.show(this.state.data)}
        		
			</div>
		);
		return body;
	}
}

export default PokeList;