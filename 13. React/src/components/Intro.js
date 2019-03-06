import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Intro extends Component{
	render() {
        return (
            <div className="App-body">
                <h1>Pokemon Api</h1>
                <p>This is a website for Pokemon fan. It is based on JavaScript react. Feel free to click the links below viewing information you need.</p>
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

export default Intro;