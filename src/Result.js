import React, { Component } from 'react';
import "./Result.css"
import {FRACTIONS} from "./fractions.js";

class Result extends Component {
	render() {
		var {result} = this.props;
		var compositionList = result.composition.map( (amount, i) => {
			return amount ? 
				<li key={i.toString()}>{FRACTIONS[i] + " : " + amount}</li> :
				null;
		});
		return (
			<div className="container result-box">
				<h1 className="title">Result</h1>
				Money Needed: 
				<ul>{compositionList}</ul>
				{result.remainder ? "The remainder is " + result.remainder : null}
			</div>
		);
	}
}

export default Result;