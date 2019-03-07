import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
			//console.log(response.data);
		}
		catch(e){
			console.log(e);
		}
	}

	componentDidMount() {
        this.getLists();
	}

	componentDidUpdate() {
        this.getLists();
	}

	show(data){
		if(!data) return "No Data!";
		const list = data.results.map((o,i)=>{
			return <li key={i}><Link to={"/berries/" + o.url.split("/")[6]}>{o.name}</Link></li>
		});
		return (<ol>{list}</ol>);
	}

	pagination(){
		let pageNum = Number(this.props.match.params.page);

		let next = pageNum + 1;
		let pre = pageNum - 1;
		//console.log(pre,next);
		if(pageNum===0){
			return (<li><Link to={"/berries/page/" + next}>Next</Link></li>);
		}
		else{
			return (<ul>
						<li><Link to={"/berries/page/" + pre}>Previous</Link></li>
						<li><Link to={"/berries/page/" + next}>Next</Link></li>
					</ul>
			);
		}
	}

	render(){
		if(this.state.data!=undefined){
			if(this.state.data.results.length==0){
		 	return (
         		<Redirect to="/nomatch"/>
       		)
     		}
		}
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
                {this.pagination()}
        		{this.show(this.state.data)}
			</div>
		);
		return body;
	}
}

export default BerryList;