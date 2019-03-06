import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Poke extends Component{
	constructor(props) {
      super(props);
      this.state = {
         data: undefined,
         loading: false
      };
	}
}

export default Poke;