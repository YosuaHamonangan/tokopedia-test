import React, { Component } from 'react';
import './App.css';

import {FRACTIONS, MIN_FRACTIONS} from "./fractions.js";
import Result from './Result.js';


class App extends Component {
	constructor(props){
		super(props);
		this.amount = 0;
		this.state = {
			amountStr: "0",
			error: false
		}
	}

	setError(msg){
		this.amount = null;

		this.setState({
			error: true,
			errorMsg: msg
		});
	}

	validate(str){
		// Make the check not case sensitive
		str = str.toLowerCase();

		// Check if input starts with number or "Rp"
		// Remove "Rp" and whitespaces that exist in the beginning
		// leaving only the value
		if(str.startsWith("rp")){
			str = str.replace(/^rp\s*/, "");
			if(!str.match(/^\d/)) 
				return this.setError('"Rp" must be followed by a number');
		}
		else if(!str.match(/^\d/)) 
			return this.setError('Input must begin with a number or "Rp"');

		// Check if value only contains number, dot, and comma
		if(!str.match(/^[\d.,]+$/)) 
			return this.setError("Value can only contains number, dot, and comma");
		
		// Check format
		if(!(str.match(/^\d+(,\d{1,2})?$/) || str.match(/^(\d{1,3})(\.\d{3})*(,\d{1,2})?$/)))
			return this.setError("Value has invalid format");

		// Remove all dot for parsing
		str = str.replace(".", "");

		// Replace comma with dot for parsing
		str = str.replace(",", ".");

		this.amount = +str;
		this.setState({error: false});
	}

	getMoneyNeeded(){
		var amount = this.amount,
			composition = FRACTIONS.map( () => 0);

		function findMaxFraction(fraction){
			return amount >= fraction;	
		} 

		while(amount > MIN_FRACTIONS){
			var fractionIndex = FRACTIONS.findIndex(findMaxFraction);
			amount -= FRACTIONS[fractionIndex];
			composition[fractionIndex]++;
		}

		return {
			composition,
			remainder: amount
		}
	}

	onSubmit(evt){
		evt.preventDefault();
		
		// Do nothing if input is invalid
		if(this.state.error) return;

		this.setState({
			result: this.getMoneyNeeded()
		});
	}

	onChange(evt){
		var amountStr = evt.target.value; 
		this.setState({amountStr});
		this.validate(amountStr)
	}

	render() {
		var errorMsg = this.state.error ? <p className="error-msg">Error: {this.state.errorMsg}</p> : null;

		return (
			<div className="App">
				<div className="inner-div">
					<form className="container main-form" onSubmit={this.onSubmit.bind(this)}>
						<h1 className="title">Fraction Calculator</h1>
						<p>Input the amount of money that you want to calculate</p>
						{errorMsg}
						<input name="amount" value={this.state.amountStr} onChange={this.onChange.bind(this)}/>
						<input type="submit" value="Show Result"/>
					</form>
					{this.state.result ? <Result result={this.state.result} /> : null}
				</div>
			</div>
		);
	}
}

export default App;
