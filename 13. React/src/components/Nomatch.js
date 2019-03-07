import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nomatch extends Component{
	render() {
        return (
            <div className="App-body">
                <h1>No Data</h1>
                <p>No data fetched from API</p>
                <p>404</p>
                <ul>
                	<li>
                		<Link to="/pokemon/page/0">Pokemon List</Link>
                	</li>
                	<li>
                		<Link to="/berries/page/0">Berry List</Link>
                	</li>
                	<li>
                		<Link to="/machines/page/0">Machine List</Link>
                	</li>
          		</ul>
            </div>
        );
	}
}

export default Nomatch;