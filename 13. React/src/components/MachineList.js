import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class MachineList extends Component{
	constructor(props) {
      super(props);
      this.state = {
         data: undefined,
         datalist: undefined,
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
                `https://pokeapi.co/api/v2/machine/?offset=${pageNum}`
			);
			//console.log(response.data);
            let ma=[];

			for(let i=0;i<response.data.results.length;++i){
				//console.log(response.data.results[i].url);
				let res = await axios.get(
                	response.data.results[i].url
				);
				ma.push(res.data);
			}
			//console.log(ma)
            this.setState ({
         		data: response.data,
         		datalist: ma,
         		pre: pageNum/20,
         		loading: false
      		});
			
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
		const list = data.map((o,i)=>{
			return <li key={i+Number(this.props.match.params.page)*20}><Link to={"/machines/" + o.id}>Machine {o.move.name}</Link></li>
		});
		return (<ol>{list}</ol>);
	}

	pagination(){
		let pageNum = Number(this.props.match.params.page);
		let next = pageNum + 1;
		let pre = pageNum - 1;
		if(pageNum===0){

			return (<li><Link to={"/machines/page/" + next}>Next</Link></li>);
		}
		else{
			return (<ul>
						<li><Link to={"/machines/page/" + pre}>Previous</Link></li>
						<li><Link to={"/machines/page/" + next}>Next</Link></li>
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
                <h2>Machine List</h2>
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
        		{this.show(this.state.datalist)}
			</div>
		);
		return body;
	}
}

export default MachineList;